class JobDescriptionInput extends React.Component {
    constructor(props) {
        super(props);
        let isValid = false;
        let msg = this.validate(props.value);

        if (msg === "") {
            isValid = true;
        }

        this.state = { value: props.value, valid: isValid, error: msg };
        this.onChange = this.onChange.bind(this);
    }

    validate(val) {
        if (val.length > 255) {
            return "Description should be less than 255 characters";
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
            <label>Description</label>
            <span className="text-danger" style={{display:'inline-block', float:'right'}}>{this.state.error}</span>
            <textarea rows="2" className="form-control" style={{ resize: 'vertical' }} value={this.state.value} onChange={this.onChange}/>
            </div>;
    }
}