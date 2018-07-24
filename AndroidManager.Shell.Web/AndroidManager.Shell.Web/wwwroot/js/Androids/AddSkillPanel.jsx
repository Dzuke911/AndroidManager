class AddSkillPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: props.usedSkills , allSkills : props.allSkills};

        this.addSkill = this.addSkill.bind(this);
    }

    addSkill(e) {
        let name = this.refs.skillNameInput.state.value;
        this.props.onAddSkill(name);
    }

    render() {

        return <div className="skill-panel">
            <div className="col-xs-10">
                <SkillNameInput value="" ref="skillNameInput" allSkills={this.state.allSkills}/>
            </div>
            <div className="col-xs-2">
                <button className="btn btn-primary skill-btn-add" onClick={this.addSkill} data-toggle="tooltip" title="Add skill"><span className="glyphicon glyphicon-plus-sign" style={{ fontSize: '1.3em' }}></span></button>
            </div>
            <div>
                <b>Android skills:</b>
                <select size="10">
                    </select>
                </div>
        </div>;
    }
}