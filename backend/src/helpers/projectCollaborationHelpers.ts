import ProjectCollaborationModel from '../models/projectCollaborationModel';

export const getProjectCollabById = (id: string) =>
    ProjectCollaborationModel.findById(id);

export const createProjectCollab = (values: Record<string, any>) => {
    try {
        const collabProject = new ProjectCollaborationModel(values).save();
        return collabProject;
    } catch (error) {
        throw new Error('Failed to create project collaboration.');
    }
};

export const updateProjectCollabStatus = (
    collabId: string,
    values: Record<string, any>
) => {
    try {
        const updatedCollab = ProjectCollaborationModel.findByIdAndUpdate(
            collabId,
            values
        );
        return updatedCollab;
    } catch (error) {
        throw new Error('Failed to update collaboration status!');
    }
};

export const deleteProjectCollab = (id: string) => {
    try {
        const deletedProjectCollab = ProjectCollaborationModel.findOneAndDelete(
            { _id: id }
        );
        return deletedProjectCollab;
    } catch (error) {
        throw new Error('Failed to delete project collbaoration.');
    }
};
