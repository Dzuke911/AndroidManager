class UpdateJobForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { Job: this.props.Job }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let Name = this.refs.jobNameInput.state.value;
        let Description = this.refs.jobDescriptionInput.state.value;
        let Complexity = this.refs.jobComplexityInput.state.value;

        let data = { "Id": this.state.Job.Id ,"Name": Name, "Description": Description, "Complexity": Complexity };

        this.props.onUpdateJob(data);
    }

    render() {

        let Name, Description, Complexity;        

        if (this.state.Job === undefined) {
            Name = "";
            Description = "";
            Complexity = 0;
        }
        else {
            if (this.state.Job !== this.props.Job) {
                this.setState({ Job: this.props.Job })

                Name = this.props.Job.Name;
                Description = this.props.Job.Description;
                Complexity = this.props.Job.Complexity;

            } else {
                Name = this.state.Job.Name;
                Description = this.state.Job.Description;
                Complexity = this.state.Job.Complexity;
            }
        }

        return <div className="panel panel-primary">
            <div className="panel-heading">
                <h5>Create new job</h5>
            </div>
            <div className="panel-body">
                <form onSubmit={this.handleSubmit}>
                    <JobNameInput value={Name} ref="jobNameInput" />
                    <JobDescriptionInput value={Description} ref="jobDescriptionInput" />
                    <JobComplexityInput value={Complexity} ref="jobComplexityInput" />
                    <input type="submit" className="btn btn-primary form-control" value="Update" />
                </form>
            </div>
        </div>;
    }
}