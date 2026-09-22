import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { describe, it, expect, testContext, printSuiteResults, printTierHeader } from './test_utils.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../..');
const TECH_STACK_FILE = path.join(ROOT_DIR, 'src/components/sections/TechStack.tsx');
const ABOUT_ME_FILE = path.join(ROOT_DIR, 'src/components/sections/AboutMe.tsx');

export async function runTier1Tests() {
  const tierStart = performance.now();
  const initialChecks = testContext.totalChecks;
  const initialPassed = testContext.passedChecks;
  const initialFailed = testContext.failedChecks;

  printTierHeader(1, 'Feature Coverage', 'Validates design skills catalog, software tools, and AboutMe identity content.');

  describe('Tier 1.1: TechStack Categories & Schema Contract', () => {
    const techStackContent = fs.readFileSync(TECH_STACK_FILE, 'utf8');

    it('TechStack source file exists and is non-empty', () => {
      expect(fs.existsSync(TECH_STACK_FILE)).toBe(true);
      expect(techStackContent.length).toBeGreaterThan(100);
    });

    it('TechStack defines skills and software categories', () => {
      expect(/id:\s*['"]skills['"]/i.test(techStackContent)).toBe(true);
      expect(/id:\s*['"]software['"]/i.test(techStackContent)).toBe(true);
    });

    it('TechStack matches interface contracts for TechItem and Category', () => {
      expect(techStackContent).toMatch(/name:\s*['"][^'"]+['"]/);
      expect(techStackContent).toMatch(/export interface TechItem/);
    });
  });

  describe('Tier 1.2: Core Design Skills Presence', () => {
    const techStackContent = fs.readFileSync(TECH_STACK_FILE, 'utf8');

    const coreSkills = [
      'Graphic Design',
      'Art Direction',
      'Brand Identity',
      'Logo Design',
      'Packaging Design',
      'Print Design',
      'Typography',
      'Social Media Design',
      'Digital Content',
      'AI-Assisted Visuals',
    ];

    for (const skill of coreSkills) {
      it(`Skill "${skill}" is defined in TechStack`, () => {
        expect(techStackContent.includes(`name: '${skill}'`) || techStackContent.includes(`name: "${skill}"`)).toBe(true);
      });
    }
  });

  describe('Tier 1.3: Creative Software Coverage', () => {
    const techStackContent = fs.readFileSync(TECH_STACK_FILE, 'utf8');

    const expectedSoftware = [
      'Adobe Illustrator',
      'Adobe Photoshop',
      'Adobe InDesign',
      'Figma',
      'Canva',
      'CapCut',
      'Microsoft Excel',
    ];

    for (const skill of expectedSoftware) {
      it(`Catalog includes software: ${skill}`, () => {
        expect(techStackContent.includes(`name: '${skill}'`) || techStackContent.includes(`name: "${skill}"`)).toBe(true);
      });
    }

    it('Figma icon references /Services/figma.png', () => {
      expect(techStackContent.includes("/Services/figma.png")).toBe(true);
    });
  });

  describe('Tier 1.4: AboutMe Section Identity & Proof', () => {
    const aboutContent = fs.readFileSync(ABOUT_ME_FILE, 'utf8');

    it('AboutMe contains Graphic Designer & Art Director identity', () => {
      expect(/Graphic Designer & Art Director/i.test(aboutContent)).toBe(true);
    });

    it('AboutMe includes Completo founder designation', () => {
      expect(/Founder of Completo/i.test(aboutContent)).toBe(true);
    });

    it('AboutMe includes professional statistics', () => {
      expect(/2,500\+|2500|design hours/i.test(aboutContent)).toBe(true);
      expect(/50\+|clients/i.test(aboutContent)).toBe(true);
    });

    it('AboutMe includes designer tagline', () => {
      expect(/Judges a book by its cover/i.test(aboutContent)).toBe(true);
    });

    it('AboutMe embeds FlowField canvas simulation in visual wrapper', () => {
      expect(aboutContent.includes('<FlowField')).toBe(true);
      expect(aboutContent.includes("from '@/components/canvas/FlowField'")).toBe(true);
    });

    it('AboutMe includes editorial typography styling with AnimatedHeading & ScrollWordReveal', () => {
      expect(aboutContent.includes('AnimatedHeading')).toBe(true);
      expect(aboutContent.includes('ScrollWordReveal')).toBe(true);
    });
  });

  for (const suite of testContext.suites) {
    printSuiteResults(suite);
  }

  const durationMs = performance.now() - tierStart;
  const totalChecks = testContext.totalChecks - initialChecks;
  const passedChecks = testContext.passedChecks - initialPassed;
  const failedChecks = testContext.failedChecks - initialFailed;

  return {
    id: 'Tier 1',
    name: 'Feature Coverage',
    totalChecks,
    passedChecks,
    failedChecks,
    durationMs,
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  testContext.reset();
  runTier1Tests().then((res) => {
    console.log(`\nTier 1 Finished: ${res.passedChecks}/${res.totalChecks} passed in ${res.durationMs.toFixed(1)}ms`);
    process.exit(res.failedChecks > 0 ? 1 : 0);
  });
}
