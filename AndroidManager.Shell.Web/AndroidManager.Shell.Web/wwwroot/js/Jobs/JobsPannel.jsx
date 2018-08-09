require('./JobsPanelBody');
require('./../ErrorMsg');
require('./CreateJobForm');
require('./UpdateJobForm');
class JobsPannel extends React.Component {

    constructor(props) {
        super(props);
        let emptyJob = { "Id": null, "Name": "", "Description": "", "Complexity": 0 };
        this.state = { jobs: [], editableData: emptyJob, showCreate: false, showUpdate: false, errNum: 0, errMsg: ""};

        this.onCreateJob = this.onCreateJob.bind(this);
        this.onUpdateJob = this.onUpdateJob.bind(this);
        this.onDeleteJob = this.onDeleteJob.bind(this);
        this.setEditableData = this.setEditableData.bind(this);
        this.hideForms = this.hideForms.bind(this);
    }

    loadData() {
        let xhr = new XMLHttpRequest();
        xhr.open("get", this.props.getUrl, true);
        xhr.onload = function () {
            let data = JSON.parse(xhr.responseText);
            this.setState({ jobs: data });
        }.bind(this);
        xhr.send();
    }

    componentDidMount() {
        this.loadData();
    }

    hideForms(show) {

        let showCreate = false;
        let showUpdate = false;

        if (show == "Create") {
            showCreate = true;
        }

        if (show == "Update") {
            showUpdate = true;
        }

        this.setState({ showCreate: showCreate, showUpdate: showUpdate });
    }

    onCreateJob(job) {
        if (job) {

            let data = JSON.stringify({ "Name": job.Name, "Description": job.Description, "Complexity": job.Complexity });
            let xhr = new XMLHttpRequest();

            xhr.open("post", this.props.postUrl, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onload = function () {
                if (xhr.status == 200) {
                    this.loadData();
                }
                else {
                    let data = JSON.parse(xhr.responseText);
                    let num = this.state.errNum + 1;
                    this.setState({ errNum: num, errMsg: data.Message });
                    this.loadData();
                }
            }.bind(this);
            xhr.send(data);
        }
    }

    setEditableData(job) {
        if (job) {
            this.setState({ editableData: job });
        }
    }

    onUpdateJob(job) {
        if (job) {

            let data = JSON.stringify({ "Id": job.Id, "Name": job.Name, "Description": job.Description, "Complexity": job.Complexity });
            let xhr = new XMLHttpRequest();

            xhr.open("put", this.props.putUrl, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onload = function () {
                if (xhr.status == 200) {
                    this.loadData();
                }
                else {
                    let data = JSON.parse(xhr.responseText);
                    let num = this.state.errNum + 1;
                    this.setState({ errNum: num, errMsg: data.Message });
                    this.loadData();
                }
            }.bind(this);
            xhr.send(data);
        }
    }

    onDeleteJob(job) {
        if (job) {

            let data = JSON.stringify({ "Id": job.Id});
            let xhr = new XMLHttpRequest();

            xhr.open("delete", this.props.deleteUrl, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onload = function () {
                if (xhr.status == 200) {
                    this.loadData();
                }
                else {
                    let data = JSON.parse(xhr.responseText);
                    let num = this.state.errNum + 1;
                    this.setState({ errNum: num, errMsg: data.Message });
                    this.loadData();
                }
            }.bind(this);
            xhr.send(data);
        }
    }

    render() {

        return <div>
            <div className="panel panel-primary">
                <div className="panel-heading text-center">
                    <h3>Jobs</h3>
                </div>
                <JobsPanelBody jobs={this.state.jobs} setEditableData={this.setEditableData} hideForms={this.hideForms} onDeleteJob={this.onDeleteJob} />
            </div>
            <ErrorMsg errNum={this.state.errNum} msg={this.state.errMsg} />
            {this.state.showCreate && <CreateJobForm onCreateJob={this.onCreateJob} hideForms={this.hideForms} jobs={this.state.jobs}/>}
            {this.state.showUpdate && <UpdateJobForm onUpdateJob={this.onUpdateJob} hideForms={this.hideForms} editableData={this.state.editableData} jobs={this.state.jobs}/>}
        </div>;
    }
}

ReactDOM.render(
    <JobsPannel getUrl={document.getElementById("GetJobsUrl").innerHTML} postUrl={document.getElementById("PostJobsUrl").innerHTML} putUrl={document.getElementById("PutJobsUrl").innerHTML} deleteUrl={document.getElementById("DeleteJobsUrl").innerHTML} />,
    document.getElementById("JobsPannel")
);