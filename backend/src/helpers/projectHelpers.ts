import ProjectModel from '../models/projectModel';

export const createNewProject = (values: Record<string, any>) =>
    new ProjectModel(values).save().then((project) => project.toObject());

export const getProjectById = (id: string) => ProjectModel.findById(id);

export const getAllProjects = (userId: string) =>
    ProjectModel.find({ admin_id: userId });

export const deleteProjectById = (id: string) =>
    ProjectModel.findOneAndDelete({ _id: id });
