


export let ideas = [ { id: 1, title: 'Idea title 1', owner: 'Gourav', mentorAlias: 'goagrawal', projectDescription: 'desc 1', epSubArea: 'ES', domain: 'domain 1', level: 'Intermediate', duration: '4 Weeks', preRequisites: 'React JS, .Net', references: 'wiki link 1', comments: 'abc 2' }];

export const addIdea = (idea) => {
  ideas.push({ id: ideas.length + 1, ...idea }); // Ensure unique ID
  console.log('New idea added:', idea);
};

export const getIdeas = () => ideas;

