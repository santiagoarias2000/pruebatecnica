
class UserEntity {

    public nameUser: string;
    public emailUser: string;
    public passwordUser: string;
    public typeUser:Number;

    constructor(name: string, correo: string, pass: string, type: number) {
        this.nameUser = name;
        this.emailUser =correo;
        this.passwordUser = pass;
        this.typeUser = type

    }

}
export default UserEntity;