class Mail
{
    constructor(props)
    {
        this.sender = props.sender;
        this.recipient = props.recipient;
        this.subject = props.subject;
        this.body = props.body;
        this.attachments = props.attachments;
    }
}
