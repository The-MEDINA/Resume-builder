export class ResumeElements
{
    constructor()
    {
        console.log("PLEASE")
    }
}
export class Title extends ResumeElements
{
    constructor(name)
    {
        super();
        this.fullName = name;
        console.log("please x2")
    }
    /// Prints the full name that was given.
    Print()
    {
        return this.fullName;
    }
}