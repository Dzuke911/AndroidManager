class UpdateAndroidForm extends React.Component {
    constructor(props) {
        super(props);

        let currentSkills = [];
        let skills = props.editableData.Skills;

        for (let i = 0; i < skills.length; i++) {
            currentSkills.push(skills[i].Name);
        }

        this.state = { currentSkills: currentSkills, androids: props.androids};

        this.handleSubmit = this.handleSubmit.bind(this);
        this.addSkill = this.addSkill.bind(this);
        this.removeSkill = this.removeSkill.bind(this);
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.props.editableData != nextProps.editableData) {

            let currentSkills = [];
            let skills = nextProps.editableData.Skills;

            for (let i = 0; i < skills.length; i++) {
                currentSkills.push(skills[i].Name);
            }

            this.setState({ currentSkills: currentSkills });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.props.editableData.Id) {
            if (this.refs.androidNameInput.state.valid &&
                this.refs.androidJobInput.state.valid) {
                let Name = this.refs.androidNameInput.state.value;
                let JobId = this.refs.androidJobInput.state.value;

                let Id = this.props.editableData.Id;
                let Skills = this.state.currentSkills;

                let data = { "Id": Id, "Name": Name, "JobId": JobId, "Skills": Skills };

                this.props.onUpdateAndroid(data);
                this.props.hideForms(null);
            }
        }
    }

    addSkill(name) {
        let skills = this.state.currentSkills;

        let have = false;
        for (let i = 0; i < skills.length; i++) {
            if (skills[i] == name) {
                have = true;
            }
        }

        if (have == false) {
            skills.push(name);
            this.setState({ currentSkills: skills });
        }
    }

    removeSkill(name) {
        let skills = this.state.currentSkills;

        let have = false;
        let position = 0;
        for (let i = 0; i < skills.length; i++) {
            if (skills[i] == name) {
                have = true;
                position = i;
            }
        }

        if (have == true) {
            skills.splice(position, 1);
            this.setState({ currentSkills: skills });
        }
    }

    render() {

        return <div className="panel panel-primary">
            <div className="panel-heading text-center">
                <h4>Edit android</h4>
            </div>
            <div className="panel-body">
                <form onSubmit={this.handleSubmit}>
                    <div className="col-sm-8">
                        <AndroidNameInput value={this.props.editableData.Name} ref="androidNameInput" androids={this.state.androids} editableName={this.props.editableData.Name}/>
                        <AndroidJobInput value={this.props.editableData.Job.Id} jobs={this.props.jobs} ref="androidJobInput" />
                    </div>
                    <div className="col-sm-4">
                        <AddSkillPanel allSkills={this.props.skills} onAddSkill={this.addSkill} onRemoveSkill={this.removeSkill} currentSkills={this.state.currentSkills} />
                    </div>
                    <input type="submit" className="btn btn-primary form-control" value="Update" />
                </form>
            </div>
        </div>;
    }
}