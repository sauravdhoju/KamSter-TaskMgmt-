import cron from 'node-cron';
import nodemailer from 'nodemailer';
import TaskModel from '../models/taskModel';

import { email_user, email_password, frontend_url } from '../envconfig';
import { getUserById } from '../helpers/userHelpers';

// configure nodemailer to send email
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: email_user,
        pass: email_password,
    },
});

export const startTaskScheduler = () => {
    cron.schedule('* * * * *', async () => {
        const now = new Date();

        try {
            // find tasks due
            const dueTasks = await TaskModel.find({
                due_date: { $lte: now },
                email_sent: false,
            });

            for (const task of dueTasks) {
                const taskUser = await getUserById(task.user_id.toString());
                if (!taskUser) throw new Error('Task user not found!');
                const mailOptions = {
                    from: email_user,
                    to: taskUser.email,
                    subject: 'Task Deadline Reached',
                    html: `
            <p>The task <strong>${task.task_name}</strong> is due.</p>
            <p>Please take action.</p>
            <a href='${frontend_url}/api/task/mark-complete/${task._id.toString()}' target="_blank" style="color: green; font-weight: bold;">Mark Complete</a>
            `,
                };

                try {
                    await transporter.sendMail(mailOptions);
                    console.log(`Email sent for task: ${task.task_name}`);

                    task.email_sent = true;
                    await task.save();
                } catch (error) {
                    console.error(
                        `Failed to send email for task: ${task.task_name}: `,
                        error
                    );
                }
            }
        } catch (error) {
            console.log('Error checking tasks: ', error);
        }
    });
};
