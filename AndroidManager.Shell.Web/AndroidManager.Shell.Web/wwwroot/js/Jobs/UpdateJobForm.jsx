class UpdateJobForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.props.editableData.Id){
            let Name = this.refs.jobNameInput.state.value;
            let Description = this.refs.jobDescriptionInput.state.value;
            let Complexity = this.refs.jobComplexityInput.state.value;

            let Id = this.props.editableData.Id;

            let data = { "Id": Id, "Name": Name, "Description": Description, "Complexity": Complexity };

            this.props.onUpdateJob(data);
            this.props.hideForms(null);
        }
    }

    render() {

        return <div className="panel panel-primary">
            <div className="panel-heading text-center">
                <h4>Edit job</h4>
            </div>
            <div className="panel-body">
                <form onSubmit={this.handleSubmit}>
                    <JobNameInput value={this.props.editableData.Name} ref="jobNameInput" />
                    <JobDescriptionInput value={this.props.editableData.Description} ref="jobDescriptionInput" />
                    <JobComplexityInput value={this.props.editableData.Complexity} ref="jobComplexityInput" />
                    <input type="submit" className="btn btn-primary form-control" value="Update" />
                </form>
            </div>
        </div>;
    }
}