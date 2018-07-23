class JobComplexityInput extends React.Component {
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
        if (val < 0) {
            return "Complexity should be more than zero";
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

        this.setState({ value: val, valid: isValid, error: msg });
    }

    render() {
        let formClass = "form-group";

        if (this.state.valid === false) {
            formClass += " has-error";
        }

        return <div className={formClass}>
            <label>Complexity</label>
            <span className="text-danger" style={{ display: 'inline-block', float: 'right' }}>{this.state.error}</span>
            <input type="number" min="0" className="form-control" value={this.state.value} onChange={this.onChange} />
        </div>;
    }
}