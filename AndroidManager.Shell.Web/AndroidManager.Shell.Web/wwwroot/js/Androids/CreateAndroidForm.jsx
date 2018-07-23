class CreateAndroidForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let Name = this.refs.androidNameInput.state.value;

        let data = { "Name": Name };

        this.props.onCreateAndroid(data);
        this.props.hideForms(null);
    }

    render() {
        return <div className="panel panel-primary">
            <div className="panel-heading text-center">
                <h4>Create new android</h4>
            </div>
            <div className="panel-body">
                <form onSubmit={this.handleSubmit}>
                    <AndroidNameInput value="newAndroid" ref="androidNameInput" />
                    <input type="submit" className="btn btn-primary form-control" value="Submit" />
                </form>
            </div>
        </div>;
    }
}