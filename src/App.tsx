import TitleCard from './components/titlecard/titlecard';
import OceanFloor from './components/oceanfloor/OceanFloor';
import heroImg from './assets/hero.png';
import './App.css'

const FAKE_CREDENTIALS = [
  { title: 'B.S. Computer Science', issuer: 'State University', achieved: '2021' },
  { title: 'AWS Certified Developer', issuer: 'Amazon Web Services', achieved: '2022' },
  { title: 'Full-Stack Web Development', issuer: 'Coding Bootcamp', achieved: '2023' },
];

function App() {
  return (
    <div className="page">
      <TitleCard
        name="Jamie Rivera"
        image={heroImg}
        bio="Web developer who loves building playful, interactive interfaces — currently obsessed with animating an entire ocean floor in CSS. I got my start tinkering with small personal projects and slowly fell in love with the process of turning a blank page into something that moves, responds, and feels alive. Since then I've worked across the stack, from wiring up backend APIs to obsessing over the exact easing curve of a hover animation. When I'm not writing code I'm usually reading about design systems, poking at some new CSS feature that just shipped, or rebuilding something I made years ago now that I know better. I care a lot about the small details — the kind most people never consciously notice, but definitely feel when they're missing."
        credentials={FAKE_CREDENTIALS}
      />
      <OceanFloor />
    </div>
  )
}

export default App
