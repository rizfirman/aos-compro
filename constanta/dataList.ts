import domainScreen from '@/assets/domain-screen.jpg'
import domainStage from '@/assets/domain-stage.jpg'
import domainSpace from '@/assets/domain-space.jpg'

import projectScreen01 from '@/assets/project-screen-01.jpg'
import projectScreen02 from '@/assets/project-screen-02.jpg'
import projectScreen03 from '@/assets/project-screen-03.jpg'
import projectBrandFilm from '@/assets/project-brand-film.jpg'
import projectMotion from '@/assets/project-motion.jpg'

import projectStage01 from '@/assets/project-stage-01.jpg'
import projectStage02 from '@/assets/project-stage-02.jpg'
import projectStage03 from '@/assets/project-stage-03.jpg'
import projectStage from '@/assets/project-stage.jpg'
import projectCorporateStage from '@/assets/project-corporate-stage.jpg'

import projectSpace01 from '@/assets/project-space-01.jpg'
import projectSpace02 from '@/assets/project-space-02.jpg'
import projectSpace03 from '@/assets/project-space-03.jpg'
import projectMapping from '@/assets/project-mapping.jpg'
import projectImmersive from '@/assets/project-immersive.jpg'

import type { Domain, Section } from '@/types/global-type'

export const sections: Section[] = [
  {
    label: 'The Studio',
    title: 'An Integrated Visual Practice',
    content:
      'AOS is a multidisciplinary visual production studio operating across screen, stage, and spatial environments. We handle concept, design, production, and delivery under one roof — ensuring coherence and quality at every stage of every project.',
  },
  {
    label: 'Philosophy',
    title: 'Structure Creates Freedom',
    content:
      'We believe the best creative work emerges from structured systems. Our approach combines systematic thinking with visual artistry — building frameworks that enable creative exploration without losing sight of the objective.',
  },
  {
    label: 'How We Work',
    title: 'From Brief to Delivery',
    content:
      'Our production workflow is designed for precision and adaptability. We begin with strategic alignment — understanding the visual problem before proposing solutions.',
  },
]

export const domains: Domain[] = [
  {
    id: 1,
    slug: 'screen',
    title: 'Visual for Screen',
    label: 'Screen',
    image: domainScreen,
    video: '/videos/showreel_aos.mp4',
    description:
      'Cinematic content, brand films, motion graphics, and digital campaigns built to captivate on every screen.',
    longDescription:
      'We create visual content engineered for screen-based delivery — from broadcast commercials to digital campaigns, brand films to social content systems. Every frame is crafted with cinematic precision, ensuring your visual identity translates with impact across all screen formats.',
    capabilities: [
      'Motion Design',
      'Commercial Visuals',
      'Brand Content',
      'Digital Visual Campaigns',
      'Visual Storytelling',
      '2D & 3D Animation',
    ],
    projects: [
      { title: 'Kinetic Flow', client: 'Maison Lumière', image: projectMotion },
      {
        title: 'Noir Essence',
        client: 'Atelier Noir',
        image: projectBrandFilm,
      },
      { title: 'Neon Pulse', client: 'Vertex Labs', image: projectScreen01 },
      {
        title: 'Studio Light',
        client: 'Nova Creative',
        image: projectScreen02,
      },
      { title: 'Liquid Form', client: 'Alchemy Co.', image: projectScreen03 },
      { title: 'Chromatic', client: 'Prisma Agency', image: projectMotion },
      {
        title: 'Signal Wave',
        client: 'Broadcast Inc.',
        image: projectScreen01,
      },
      {
        title: 'Frame Perfect',
        client: 'Cinéma House',
        image: projectBrandFilm,
      },
      { title: 'Digital Canvas', client: 'Art+Code', image: projectScreen03 },
      { title: 'Motion Shift', client: 'Drift Studio', image: projectScreen02 },
    ],
    playlistUrl: 'https://youtube.com/playlist?list=YOUR_SCREEN_PLAYLIST',
  },
  {
    id: 2,
    slug: 'stage',
    title: 'Visual for Stage',
    label: 'Stage',
    image: domainStage,
    video: '/video.mp4',
    description:
      'Real-time visual systems for live performances, concerts, award shows, and large-scale events.',
    longDescription:
      'We design and deliver visual systems for live stages — from arena concerts to award ceremonies, corporate keynotes to festival main stages. Our approach combines creative direction with technical execution, building visual narratives that synchronize with performance in real time.',
    capabilities: [
      'Stage Visual Systems',
      'Concert Visual Content',
      'LED Screen Visual Design',
      'Live Visual Performance',
      'Event Visual Direction',
    ],
    projects: [
      { title: 'Ethereal Waves', client: 'Meridian Live', image: projectStage },
      { title: 'Arena Pulse', client: 'Live Nation ME', image: projectStage01 },
      {
        title: 'Corporate Edge',
        client: 'GlobalTech Summit',
        image: projectStage02,
      },
      { title: 'Festival Blaze', client: 'Soundstorm', image: projectStage03 },
      {
        title: 'Convergence',
        client: 'Dubai Expo',
        image: projectCorporateStage,
      },
      { title: 'Night Voltage', client: 'MDL Beast', image: projectStage01 },
      { title: 'Lumina Live', client: 'Heritage Arts', image: projectStage },
      { title: 'Stage Shift', client: 'Eventium', image: projectStage02 },
      { title: 'Sonic Wave', client: 'Ultra ME', image: projectStage03 },
      {
        title: 'Grand Visual',
        client: 'DIFC Events',
        image: projectCorporateStage,
      },
    ],
    playlistUrl: 'https://youtube.com/playlist?list=YOUR_STAGE_PLAYLIST',
  },
  {
    id: 3,
    slug: 'space',
    title: 'Visual for Space',
    label: 'Space',
    image: domainSpace,
    description:
      'Immersive installations, projection mapping, and spatial visual experiences for physical environments.',
    longDescription:
      'We transform physical environments into visual experiences. Through projection mapping, immersive installations, and spatial design, we create environments where architecture becomes a canvas and space becomes narrative. Each project is site-specific, technically precise, and experientially powerful.',
    capabilities: [
      'Video Mapping',
      'Immersive Installations',
      'Spatial Visual Systems',
      'Interactive Visual Environments',
    ],
    projects: [
      {
        title: 'Echoes of Light',
        client: 'Heritage Council',
        image: projectMapping,
      },
      {
        title: 'Deep Dive',
        client: 'National Gallery',
        image: projectImmersive,
      },
      { title: 'Facade Prism', client: 'Municipality', image: projectSpace01 },
      { title: 'Fluid Realm', client: 'Art Dubai', image: projectSpace02 },
      { title: 'Light Path', client: 'Museum District', image: projectSpace03 },
      { title: 'Projected', client: 'Royal Opera', image: projectSpace01 },
      { title: 'Immersion', client: 'Expo 2025', image: projectMapping },
      { title: 'Spatial Echo', client: 'Alserkal Ave', image: projectSpace02 },
      { title: 'Canvas City', client: 'Sharjah Art', image: projectImmersive },
      { title: 'Lightform', client: 'Louvre AD', image: projectSpace03 },
    ],
    playlistUrl: 'https://youtube.com/playlist?list=YOUR_SPACE_PLAYLIST',
  },
]
