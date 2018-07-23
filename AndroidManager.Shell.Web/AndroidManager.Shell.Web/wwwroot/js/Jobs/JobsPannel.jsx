class JobsPannel extends React.Component {

    constructor(props) {
        super(props);
        this.state = { jobs: [], getUrl: this.props.getUrl, postUrl: this.props.postUrl, putUrl: this.props.putUrl, editableJob: undefined };

        this.onCreateJob = this.onCreateJob.bind(this);
        this.onUpdateJob = this.onUpdateJob.bind(this);
        this.setEditableJob = this.setEditableJob.bind(this);

    }

    loadData() {
        let xhr = new XMLHttpRequest();
        xhr.open("get", this.state.getUrl, true);
        xhr.onload = function () {
            let data = JSON.parse(xhr.responseText);
            this.setState({ jobs: data });
        }.bind(this);
        xhr.send();
    }

    componentDidMount() {
        this.loadData();
    }

    onCreateJob(job) {
        if (job) {

            let data = JSON.stringify({ "Name": job.Name, "Description": job.Description, "Complexity": job.Complexity });
            let xhr = new XMLHttpRequest();

            xhr.open("post", this.props.postUrl, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onload = function () {
                if (xhr.status == 200) {
                    console.log(xhr.status);
                    this.loadData();
                }
            }.bind(this);
            xhr.send(data);
        }
    }

    onUpdateJob(job) {
        if (job) {

            let data = JSON.stringify({"Id": job.Id, "Name": job.Name, "Description": job.Description, "Complexity": job.Complexity });
            let xhr = new XMLHttpRequest();

            xhr.open("put", this.props.putUrl, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onload = function () {
                if (xhr.status == 200) {
                    console.log(xhr.status);
                    this.loadData();
                }
            }.bind(this);
            xhr.send(data);
        }
    }

    setEditableJob(job) {
        if (job) {

            this.setState({ editableJob: job });
        }
    }

    render() {

        let editableJobFunc = this.setEditableJob;

        return <div>
            <CreateJobForm onCreateJob={this.onCreateJob} />
            <UpdateJobForm onUpdateJob={this.onUpdateJob} job={this.state.editableJob}/>
            <div className="panel panel-primary">
                <div className="panel-heading text-center">
                    <h3>Jobs</h3>
                </div>
                <div className="panel-body">
                    {
                        this.state.jobs.map(function (job) {
                            return <Job key={job.Id} job={job} setEditableJob={editableJobFunc}/>;
                        })
                    }
                </div>
            </div>
        </div>;
    }
}

ReactDOM.render(
    <JobsPannel getUrl={document.getElementById("GetJobsUrl").innerHTML} postUrl={document.getElementById("PostJobsUrl").innerHTML} putUrl={document.getElementById("PutJobsUrl").innerHTML}/>,
    document.getElementById("JobsPannel")
);