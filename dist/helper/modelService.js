"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelService = void 0;
exports.modelService = {
    FindAll: (model) => {
        return model.find({});
    },
    FindOne: (model, filter, option = null) => {
        return model.findOne(filter, option);
    },
    Created: (model, payload) => {
        return model.create(payload);
    },
    Update: (model, filter, payload) => {
        return model.findOneAndUpdate(filter, { $set: { ...payload } }, { new: true });
    },
    UpdateById: (model, filter, payload) => {
        return model.findByIdAndUpdate(filter, { $set: { ...payload } }, { new: true });
    },
    DeleteOne: (model, filter) => {
        return model.findOneAndDelete(filter);
    }
};
//# sourceMappingURL=modelService.js.map