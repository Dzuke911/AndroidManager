class CreateAndroidForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = { currentSkills: [], androids: props.androids };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.addSkill = this.addSkill.bind(this);
        this.removeSkill = this.removeSkill.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.refs.androidNameInput.state.valid &&
            this.refs.androidJobInput.state.valid &&
            this.refs.androidAvatarInput.state.valid) {

            let Name = this.refs.androidNameInput.state.value;
            let JobId = this.refs.androidJobInput.state.value;
            let Avatar = this.refs.androidAvatarInput.state.value;

            let Skills = this.state.currentSkills;

            let data = { "Name": Name, "JobId": JobId, "Skills": Skills, "Avatar": Avatar };

            this.props.onCreateAndroid(data);
            this.props.hideForms(null);
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
            skills.splice(position,1);
            this.setState({ currentSkills: skills });
        }
    }

    render() {

        return <div className="panel panel-primary">
            <div className="panel-heading text-center">
                <h4>Create new android</h4>
            </div>
            <div className="panel-body">
                <form onSubmit={this.handleSubmit}>
                    <div className="col-sm-8">
                        <AndroidNameInput value="newAndroid" ref="androidNameInput" androids={this.state.androids}/>
                        <AndroidJobInput value={this.props.jobs[0].Id} jobs={this.props.jobs} ref="androidJobInput" />
                        <AndroidAvatarInput value="" ref="androidAvatarInput" />
                    </div>
                    <div className="col-sm-4">
                        <AddSkillPanel allSkills={this.props.skills} onAddSkill={this.addSkill} onRemoveSkill={this.removeSkill} currentSkills={this.state.currentSkills} />
                    </div>
                    <input type="submit" className="btn btn-primary form-control" value="Submit" />
                </form>
            </div>
        </div>;
    }
}