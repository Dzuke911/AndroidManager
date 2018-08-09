require('./JobNameInput');
require('./JobDescriptionInput');
require('./JobComplexityInput');
class CreateJobForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = { jobs: props.jobs };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.refs.jobNameInput.state.valid &&
            this.refs.jobDescriptionInput.state.valid &&
            this.refs.jobComplexityInput.state.valid) {

            let Name = this.refs.jobNameInput.state.value;
            let Description = this.refs.jobDescriptionInput.state.value;
            let Complexity = this.refs.jobComplexityInput.state.value;

            let data = { "Name": Name, "Description": Description, "Complexity": Complexity };

            this.props.onCreateJob(data);
            this.props.hideForms(null);
        }
    }

    render() {
        return <div className="panel panel-primary">
            <div className="panel-heading text-center">
                <h4>Create new job</h4>
            </div>
            <div className="panel-body">
                <form onSubmit={this.handleSubmit}>
                    <JobNameInput value="newJob" ref="jobNameInput" jobs={this.state.jobs}/>
                    <JobDescriptionInput value="" ref="jobDescriptionInput" />
                    <JobComplexityInput value="0" ref="jobComplexityInput" />
                    <input type="submit" className="btn btn-primary form-control" value="Submit" />
                </form>
            </div>
        </div>;
    }
}