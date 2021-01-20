const AccesoInvalidoException = use('App/Exceptions/AccesoInvalidoException');
const RecursoNoEncontradoException = use('App/Exceptions/RecursoNoEncontradoException');
class AutorizathionServices{
    verificarPermiso(recurso,user){
        if(!recurso){
            throw new RecursoNoEncontradoException();
        }
        if(recurso.user_id !== user.id){
            throw new AccesoInvalidoException();
        }
    }
}

module.exports = new AutorizathionServices();