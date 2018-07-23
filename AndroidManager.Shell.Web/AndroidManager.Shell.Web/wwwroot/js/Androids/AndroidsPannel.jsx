class AndroidsPannel extends React.Component {

    constructor(props) {
        super(props);
        let emptyAndroid = { "Id": null, "Name": "" };
        this.state = { androids: [], editableData: emptyAndroid , showCreate: false, showUpdate : false};

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

    onCreateAndroid(android) {
        if (android) {

            let data = JSON.stringify({ "Name": android.Name });
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

            let data = JSON.stringify({ "Id": android.Id, "Name": android.Name });
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
            {this.state.showCreate && <CreateAndroidForm onCreateAndroid={this.onCreateAndroid} hideForms={this.hideForms} />}
            {this.state.showUpdate && <UpdateAndroidForm onUpdateAndroid={this.onUpdateAndroid} hideForms={this.hideForms} editableData={this.state.editableData} />}
        </div>;
    }
}

ReactDOM.render(
    <AndroidsPannel getUrl={document.getElementById("GetAndroidsUrl").innerHTML} postUrl={document.getElementById("PostAndroidsUrl").innerHTML} putUrl={document.getElementById("PutAndroidsUrl").innerHTML} deleteUrl={document.getElementById("DeleteAndroidsUrl").innerHTML} />,
    document.getElementById("AndroidsPannel")
);