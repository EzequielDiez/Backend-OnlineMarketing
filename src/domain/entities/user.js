
class User
{
    constructor (props)
    {
        this.id = props.id,
        this.firstName = props.firstName,
        this.lastName = props.lastName,
        this.email = props.email,
        this.age = props.age,
        this.cart = props.cart,
        this.role = props.role,
        this.password = props.password
    }
}

export default User