class UpdateJobForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = { jobs: props.jobs };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.props.editableData.Id) {
            if (this.refs.jobNameInput.state.valid &&
                this.refs.jobDescriptionInput.state.valid &&
                this.refs.jobComplexityInput.state.valid) {

                let Name = this.refs.jobNameInput.state.value;
                let Description = this.refs.jobDescriptionInput.state.value;
                let Complexity = this.refs.jobComplexityInput.state.value;

                let Id = this.props.editableData.Id;

                let data = { "Id": Id, "Name": Name, "Description": Description, "Complexity": Complexity };

                this.props.onUpdateJob(data);
                this.props.hideForms(null);
            }
        }
    }

    render() {

        let description = this.props.editableData.Description;
        if (description == null) {
            description = "";
        }

        return <div className="panel panel-primary">
            <div className="panel-heading text-center">
                <h4>Edit job</h4>
            </div>
            <div className="panel-body">
                <form onSubmit={this.handleSubmit}>
                    <JobNameInput value={this.props.editableData.Name} ref="jobNameInput" editableName={this.props.editableData.Name} jobs={this.state.jobs}/>
                    <JobDescriptionInput value={description} ref="jobDescriptionInput" />
                    <JobComplexityInput value={this.props.editableData.Complexity} ref="jobComplexityInput" />
                    <input type="submit" className="btn btn-primary form-control" value="Update" />
                </form>
            </div>
        </div>;
    }
}