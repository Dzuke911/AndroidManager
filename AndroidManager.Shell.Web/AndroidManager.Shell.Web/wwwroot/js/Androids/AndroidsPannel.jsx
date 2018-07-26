class AndroidsPannel extends React.Component {

    constructor(props) {
        super(props);
        let emptyAndroid = { "Id": null, "Name": "" };
        this.state = { androids: [], jobs:[],skills:[], editableData: emptyAndroid , showCreate: false, showUpdate : false, selectedAvatar: undefined};

        this.onCreateAndroid = this.onCreateAndroid.bind(this);
        this.onUpdateAndroid = this.onUpdateAndroid.bind(this);
        this.onDeleteAndroid = this.onDeleteAndroid.bind(this);
        this.setEditableData = this.setEditableData.bind(this);
        this.hideForms = this.hideForms.bind(this);
    }

    loadData() {
        let xhr = new XMLHttpRequest();
        xhr.open("get", this.props.getUrl, true);
        xhr.onload = function () {
            let data = JSON.parse(xhr.responseText);
            this.setState({ androids: data });
        }.bind(this);
        xhr.send();
    }

    loadJobsData() {
        let xhr = new XMLHttpRequest();
        xhr.open("get", this.props.getJobsUrl, true);
        xhr.onload = function () {
            let data = JSON.parse(xhr.responseText);
            this.setState({ jobs: data });
        }.bind(this);
        xhr.send();
    }

    loadSkillsData() {
        let xhr = new XMLHttpRequest();
        xhr.open("get", this.props.getSkillsUrl, true);
        xhr.onload = function () {
            let data = JSON.parse(xhr.responseText);
            this.setState({ skills: data });
        }.bind(this);
        xhr.send();
    }

    componentDidMount() {
        this.loadSkillsData();
        this.loadJobsData();
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

    onCreateAndroid(android) {
        if (android) {

            console.log(android.Avatar);

            let data = JSON.stringify({ "Name": android.Name, "JobId": android.JobId, "Skills": android.Skills, "Avatar": android.Avatar });

            let xhr = new XMLHttpRequest();

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

    setEditableData(android) {
        if (android) {
            this.setState({ editableData: android });
        }
    }

    onUpdateAndroid(android) {
        if (android) {

            let data = JSON.stringify({ "Id": android.Id, "Name": android.Name, "JobId": android.JobId, "Skills": android.Skills });
            let xhr = new XMLHttpRequest();

            xhr.open("put", this.props.putUrl, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onload = function () {
                if (xhr.status == 200) {
                    this.loadData();
                }
            }.bind(this);
            xhr.send(data);
        }
    }

    onDeleteAndroid(android) {
        if (android) {

            let data = JSON.stringify({ "Id": android.Id});
            let xhr = new XMLHttpRequest();

            xhr.open("delete", this.props.deleteUrl, true);
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
            <div className="panel panel-primary">
                <div className="panel-heading text-center">
                    <h3>Androids</h3>
                </div>
                <AndroidsPanelBody androids={this.state.androids} setEditableData={this.setEditableData} hideForms={this.hideForms} onDeleteAndroid={this.onDeleteAndroid} />
            </div>
            {this.state.showCreate && <CreateAndroidForm onCreateAndroid={this.onCreateAndroid} jobs={this.state.jobs} skills={this.state.skills} androids={this.state.androids} hideForms={this.hideForms} />}
            {this.state.showUpdate && <UpdateAndroidForm onUpdateAndroid={this.onUpdateAndroid} jobs={this.state.jobs} skills={this.state.skills} androids={this.state.androids} hideForms={this.hideForms} editableData={this.state.editableData} />}
        </div>;
    }
}

ReactDOM.render(
    <AndroidsPannel getUrl={document.getElementById("GetAndroidsUrl").innerHTML} postUrl={document.getElementById("PostAndroidsUrl").innerHTML} putUrl={document.getElementById("PutAndroidsUrl").innerHTML} deleteUrl={document.getElementById("DeleteAndroidsUrl").innerHTML} getJobsUrl={document.getElementById("GetJobsUrl").innerHTML} getSkillsUrl={document.getElementById("GetSkillsUrl").innerHTML} addImageUrl={document.getElementById("AddImageUrl").innerHTML}/>,
    document.getElementById("AndroidsPannel")
);