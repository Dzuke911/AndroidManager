﻿class UpdateAndroidForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.props.editableData.Id){
            let Name = this.refs.androidNameInput.state.value;
            let JobId = this.refs.androidJobInput.state.value;

            let Id = this.props.editableData.Id;

            let data = { "Id": Id, "Name": Name , "JobId": JobId};

            this.props.onUpdateAndroid(data);
            this.props.hideForms(null);
        }
    }

    render() {

        return <div className="panel panel-primary">
            <div className="panel-heading text-center">
                <h4>Edit android</h4>
            </div>
            <div className="panel-body">
                <form onSubmit={this.handleSubmit}>
                    <AndroidNameInput value={this.props.editableData.Name} ref="androidNameInput" />
                    <AndroidJobInput value={this.props.editableData.JobId} jobs={this.props.jobs} ref="androidJobInput" />
                    <input type="submit" className="btn btn-primary form-control" value="Update" />
                </form>
            </div>
        </div>;
    }
}