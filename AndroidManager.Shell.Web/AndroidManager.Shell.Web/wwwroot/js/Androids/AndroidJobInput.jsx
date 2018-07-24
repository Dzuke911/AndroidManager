class AndroidJobInput extends React.Component {
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
        if (val < 0 || val == undefined) {
            return "Select job";
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

        let JobElems = [];
        let jobs = this.props.jobs;

        for (let i = 0; i < jobs.length; i++) {
            JobElems.push(<option key={jobs[i].Id} value={jobs[i].Id} >{jobs[i].Name}</option >);
        }

        return <div className={formClass}>
            <label>Job</label>
            <span className="text-danger" style={{display:'inline-block', float:'right'}}>{this.state.error}</span>
            <select className="form-control" onChange={this.onChange}>
                {JobElems}
            </select>
            </div>;
    }
}