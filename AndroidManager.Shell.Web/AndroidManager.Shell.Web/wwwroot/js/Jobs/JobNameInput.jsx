class JobNameInput extends React.Component {
    constructor(props) {
        super(props);
        let isValid = false;

        this.state = { editableName: props.editableName, jobs: props.jobs };

        let msg = this.validate(props.value);

        if (msg === "") {
            isValid = true;
        }

        this.state = { editableName: props.editableName, value: props.value, valid: isValid, error: msg, jobs: props.jobs};
        this.onChange = this.onChange.bind(this);
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.props.value != nextProps.value || this.props.editableName != nextProps.editableName) {

            this.setState({ value: nextProps.value, editableName: nextProps.editableName});
        }
    }

    validate(val) {
        if (val.length < 2) {
            return "Job name should be 2 characters at least";
        }
        if (val.length > 16) {
            return "Job name should be less than 16 characters";
        }

        if (/^[a-zA-Z0-9-]+$/.test(val) === false) {
            return "Job name should contain alphanumeric characters only";
        }

        let jobs = this.state.jobs;

        for (let i = 0; i < jobs.length; i++) {
            if (val == jobs[i].Name && val != this.state.editableName) {
                return "This job name is already in use";
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