require('./Job');
require('./CreateJobButton');
class JobsPanelBody extends React.Component {

    constructor(props) {
        super(props);
        this.state = {jobs: props.jobs};
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.props.jobs != nextProps.jobs) {

            this.setState({ jobs: nextProps.jobs});
        }
    }

    render() {

        let jobElems = [];
        let stateJobs = this.props.jobs;

        for (let i = 0; i < stateJobs.length; i++) {
            jobElems.push(<Job key={stateJobs[i].Id} job={stateJobs[i]} setEditableData={this.props.setEditableData} hideForms={this.props.hideForms} onDeleteJob={this.props.onDeleteJob} />);
        }

        return <div className="panel-body">
                <CreateJobButton hideForms={this.props.hideForms}/>
                {jobElems}
                </div>
    }
}