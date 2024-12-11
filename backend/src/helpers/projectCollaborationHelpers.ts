import ProjectCollaborationModel from 'models/projectCollaborationModel';

export const createNewCollaboration = (values: Record<string, any>) =>
    new ProjectCollaborationModel(values)
        .save()
        .then((projectCollab) => projectCollab.toObject());
