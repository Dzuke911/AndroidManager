class CreateJobForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let Name = this.refs.jobNameInput.state.value;
        let Description = this.refs.jobDescriptionInput.state.value;
        let Complexity = this.refs.jobComplexityInput.state.value;

        let data = { "Name": Name, "Description": Description, "Complexity": Complexity };

        this.props.onCreateJob(data);
    }

    render() {
        return <div className="panel panel-primary">
            <div className="panel-heading">
                <h5>Create new job</h5>
            </div>
            <div className="panel-body">
                <form onSubmit={this.handleSubmit}>
                    <JobNameInput value="newJob" ref="jobNameInput" />
                    <JobDescriptionInput value="" ref="jobDescriptionInput" />
                    <JobComplexityInput value="0" ref="jobComplexityInput" />
                    <input type="submit" className="btn btn-primary form-control" value="Submit" />
                </form>
            </div>
        </div>;
    }
}