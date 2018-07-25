class AndroidAvatarInput extends React.Component {
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

        if (val == "") {
            return "";
        }
            
        if (val.type != "image/jpeg") {
            return "Avatar file should be image/jpeg type.";
        }
        if (val.size >= 500000) {
            return "Avatar file size should be less than 500kb.";
        }

        return "";
    }

    onChange(e) {
        let val = e.target.files[0];

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
            <label>Avatar</label>
            <span className="text-danger" style={{display:'inline-block', float:'right'}}>{this.state.error}</span>
            <input type="file" className="form-control" onChange={this.onChange}/>
            </div>;
    }
}