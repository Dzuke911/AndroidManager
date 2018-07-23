class CreateAndroidButton extends React.Component {

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        this.props.hideForms("Create");
    }

    render() {
        return <button className="btn btn-primary job-btn-create" onClick={this.onClick}>
            <div>Create new android</div>
            <div><span className="glyphicon glyphicon-plus-sign" style={{ fontSize: '2.0em'}}></span></div>
        </button>
    }
}