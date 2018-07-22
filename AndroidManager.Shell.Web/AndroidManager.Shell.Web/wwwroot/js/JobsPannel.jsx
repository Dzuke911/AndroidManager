class JobsPannel extends React.Component {

    constructor(props) {
        super(props);
        this.state = { jobs: [], getUrl: this.props.getUrl, postUrl: this.props.postUrl };

        this.onCreateJob = this.onCreateJob.bind(this);
    }

    loadData() {
        var xhr = new XMLHttpRequest();
        xhr.open("get", this.state.getUrl, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            console.log(data);
            this.setState({ jobs: data });
        }.bind(this);
        xhr.send();
    }

    componentDidMount() {
        this.loadData();
    }

    onCreateJob(job) {
        if (job) {

            console.log(job);

            var data = JSON.stringify({ "Name": job.Name, "Description": job.Description, "Complexity": job.Complexity });
            var xhr = new XMLHttpRequest();

            xhr.open("post", this.props.postUrl, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onload = function () {
                if (xhr.status == 200) {
                    this.loadData();
                }
            }.bind(this);
            xhr.send(data);
        }
    }

    render() {
        return <div>
            <CreateJob onCreateJob={this.onCreateJob} />
            <div className="panel panel-primary">
                <div className="panel-heading text-center">
                    <h3>Jobs</h3>
                </div>
                <div className="panel-body">
                    {
                        this.state.jobs.map(function (job) {
                            return <Job key={job.Id} job={job} />;
                        })
                    }
                </div>
            </div>
        </div>;
    }
}

ReactDOM.render(
    <JobsPannel getUrl={document.getElementById("GetJobsUrl").innerHTML} postUrl={document.getElementById("PostJobsUrl").innerHTML}/>,
    document.getElementById("JobsPannel")
);