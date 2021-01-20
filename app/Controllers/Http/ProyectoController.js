'use strict'

const Proyecto = use('App/Models/Proyecto');
const AutorizathionServices = use('App/Services/AuthorizationServices');

class ProyectoController {
    async index({auth}){
        const user = await auth.getUser();
        return await user.proyectos().fetch();
    }

    async create({auth,request}){
        const user = await auth.getUser();
        const {proyecto} = request.all();
        const proyecto1 = new Proyecto;
        proyecto1.fill({
            proyecto
        });
        await user.proyectos().save(proyecto1);
        return proyecto1;
    }
    async destroy({auth,params}){
        const user = await auth.getUser();
        const {id} = params;
        const proyecto2 = await Proyecto.find(id);
        AutorizathionServices.verificarPermiso(proyecto2,user);
        await proyecto2.delete();
        return proyecto2;
    }
    async update({auth,params,request}){
        const user = await auth.getUser();
        const {id} = params;
        const proyecto3 = await Proyecto.find(id);
        AutorizathionServices.verificarPermiso(proyecto3,user);
        proyecto3.merge(request.only('proyecto'));
        await proyecto3.save();
        return proyecto3;
    }

}


module.exports = ProyectoController
