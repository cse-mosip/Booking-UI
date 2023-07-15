var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'src/services/HttpServices';
const getResources = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield axios.get('/getResource');
    return (res.data);
});
const createResource = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield axios.post('/createResource', data);
    return (res.data);
});
export default {
    getResources,
    createResource
};
//# sourceMappingURL=ResourcesServices.js.map