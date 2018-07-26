class AndroidNameInput extends React.Component {
    constructor(props) {
        super(props);
        let isValid = false;

        this.state = { editableName: props.editableName, androids: props.androids };

        let msg = this.validate(props.value);

        if (msg === "") {
            isValid = true;
        }

        this.state = { editableName: props.editableName, value: props.value, valid: isValid, error: msg, androids: props.androids};
        this.onChange = this.onChange.bind(this);
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.props.value != nextProps.value || this.props.editableName != nextProps.editableName) {

            this.setState({ editableName: nextProps.editableName, value: nextProps.value })
        }
    }

    validate(val) {
        if (val.length < 5) {
            return "Android name should be 5 characters at least";
        }
        if (val.length > 24) {
            return "Android name should be less than 24 characters";
        }
        if (/^[a-zA-Z0-9-]+$/.test(val) === false) {
            return "Android name should contain alphanumeric characters only";
        }

        let androids = this.state.androids;

        for (let i = 0; i < androids.length; i++) {
            if (val == androids[i].Name && val != this.state.editableName) {
                return "This android name is already in use";
            }
        }

        return "";
    }

    onChange(e) {
        let val = e.target.value;
        let isValid = false;

        let msg = this.validate(val);

        if (msg === "") {
            isValid = true;
        }

        this.setState({ value: val, valid: isValid, error: msg});
    }

    render() {

        let formClass = "form-group";

        if (this.state.valid === false) {
            formClass += " has-error";
        }

        return <div className={formClass}>
            <label>Name</label>
            <span className="text-danger" style={{display:'inline-block', float:'right'}}>{this.state.error}</span>
                <input type="text" className="form-control" value={this.state.value} onChange={this.onChange}/>
            </div>;
    }
}