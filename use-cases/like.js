//Funcion que agrega un like al post y si lo tiene lo quita.
//Compruebo si el post existe con db-funciones GETPOSTBYID
//Si no existe salta error
//Si existe, compruebo si tiene like con db-funciones likeExists
//Si tiene like lo borro con db-funciones DELETELIKEBYUSERID
//Si no lo tiene, lo crea con CreateLike