class AddSkillPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = { currentSkills: props.currentSkills, allSkills: props.allSkills };

        this.addSkill = this.addSkill.bind(this);
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.props.currentSkills != nextProps.currentSkills) {

            this.setState({ currentSkills: nextProps.currentSkills });
        }
    }

    addSkill(e) {
        if (this.refs.skillNameInput.state.valid) {

            let name = this.refs.skillNameInput.state.value;
            this.props.onAddSkill(name);
        }
    }

    render() {

        let skillElems = [];
        let currentSkills = this.state.currentSkills;

        let showSkills = (currentSkills.length > 0);

        for (let i = 0; i < currentSkills.length; i++) {
            skillElems.push(<Skill key={i} skill={currentSkills[i]} onDeleteSkill={this.props.onRemoveSkill} />);
        }

        return <div className="skill-panel">
            <div className="col-xs-10">
                <SkillNameInput value="" ref="skillNameInput" allSkills={this.state.allSkills} currentSkills={this.state.currentSkills}/>
            </div>
            <div className="col-xs-2">
                <button type="button" className="btn btn-primary skill-btn-add" onClick={this.addSkill} data-toggle="tooltip" title="Add skill"><span className="glyphicon glyphicon-plus-sign" style={{ fontSize: '1.3em' }}></span></button>
            </div>
            <hr />
            {showSkills && <div>
                <b>Android skills:</b>
                <div>
                    {skillElems}
                </div>
            </div>}
        </div>;
    }
}