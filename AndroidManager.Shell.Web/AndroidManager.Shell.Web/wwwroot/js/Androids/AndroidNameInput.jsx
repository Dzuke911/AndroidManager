class AndroidNameInput extends React.Component {
    constructor(props) {
        super(props);
        let isValid = false;
        let msg = this.validate(props.value);

        if (msg === "") {
            isValid = true;
        }

        this.state = { value: props.value, valid: isValid, error: msg};
        this.onChange = this.onChange.bind(this);
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.props.value != nextProps.value) {

            let isValid = false;
            let msg = this.validate(nextProps.value);

            if (msg === "") {
                isValid = true;
            }

            this.setState({ value: nextProps.value, valid: isValid, error: msg});
        }
    }

    validate(val) {
        if (val.length < 5) {
            return "Job name should be 5 characters at least";
        }
        if (val.length > 24) {
            return "Job name should be less than 16 characters";
        }

        if (/^[a-zA-Z0-9-]+$/.test(val) === false) {
            return "Job name should contain alphanumeric characters only";
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