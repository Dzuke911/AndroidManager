class SkillNameInput extends React.Component {
    constructor(props) {
        super(props);
        let isValid = false;
        let msg = this.validate(props.value);

        if (msg === "") {
            isValid = true;
        }

        this.state = { value: props.value, valid: isValid, error: msg, allSkills: props.allSkills, currentSkills: props.currentSkills };
        this.onChange = this.onChange.bind(this);
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.props.value != nextProps.value) {

            let isValid = false;
            let msg = this.validate(nextProps.value);

            if (msg === "") {
                isValid = true;
            }

            this.setState({ value: nextProps.value, valid: isValid, error: msg, currentSkills: nextProps.currentSkills});
        }
    }

    validate(val) {
        if (val.length < 5) {
            return "Skill name should be 5 characters at least";
        }
        if (val.length > 16) {
            return "Skill name should be less than 16 characters";
        }

        if (/^[a-zA-Z0-9-]+$/.test(val) === false) {
            return "Skill name should contain alphanumeric characters only";
        }

        let currSkills = this.state.currentSkills;
        for (let i = 0; i < currSkills.length; i++) {
            if (val == currSkills[i]) {
                return "Android already have this skill";
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

        this.setState({ value: val, valid: isValid, error: msg });
    }

    render() {

        let formClass = "input-group";

        if (this.state.valid === false) {
            formClass += " has-error";
        }

        let SkillElems = [];
        let allSkills = this.state.allSkills;

        for (let i = 0; i < allSkills.length; i++) {
            SkillElems.push(<option key={i}>{allSkills[i]}</option>);
        }

        return <div>
            <div className={formClass}>
                <span className="input-group-addon">New skill:</span>
                <input type="text" className="form-control" value={this.state.value} onChange={this.onChange} list="skills" />
                <datalist id="skills">
                    {SkillElems}
                </datalist>
            </div>
            <span className="text-danger" style={{ display: 'inline-block', float: 'right' }}>{this.state.error}</span>
        </div>;
    }
}