import Router from 'koa-router';
import {StaffController} from '../controller/index';

const childRouter = new Router();

// 注册路由
childRouter.get('/staff/phone/:phone', StaffController.GetByPhone);
childRouter.get('/staff/name/:name', StaffController.GetByName);
childRouter.get('/staff/school/:school', StaffController.GetBySchool);
childRouter.post('/staff', StaffController.AddStaff);
// childRouter.delete("/staff", StaffController.DeleteStaff);
childRouter.post('/staff/delete', StaffController.DeleteStaff);
childRouter.get('/staff', StaffController.GetStaff);
childRouter.post('/staff/getList', StaffController.GetStaffList);
childRouter.post('/staff/fuzzy', StaffController.GetByFuzzyName);
childRouter.post('/staff/count', StaffController.GetStaffCount);
childRouter.post('/staff/update', StaffController.Update);

module.exports = childRouter;