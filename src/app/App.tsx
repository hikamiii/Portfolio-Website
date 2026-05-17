import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { ArrowLeft, Download, ExternalLink, FileText, Mail, Github, Linkedin, Moon, Sun, X } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { projects, type Project } from './projects';

type ThemeMode = 'white' | 'black';

function getProjectSlugFromHash(hash: string) {
  const match = hash.match(/^#\/projects\/([^/]+)$/);
  return match ? match[1] : null;
}

function isCvPreviewHash(hash: string) {
  return hash === '#/cv-preview';
}

function isSectionHash(hash: string) {
  return /^#(about|projects|cv)$/.test(hash);
}

function getHoverRotation(slug: string) {
  let hash = 0;
  const rotations = [-2, 2];

  for (const char of slug) {
    hash = (hash * 31 + char.charCodeAt(0)) % rotations.length;
  }

  return rotations[hash];
}

function easeInOutCubic(progress: number) {
  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

const SECTION_SCROLL_OFFSET = 40;
const CV_FILE_NAME = 'Nguyen Duc Son Hai_CV.pdf';
const CV_PDF_URL = encodeURI(`${import.meta.env.BASE_URL}cv/${CV_FILE_NAME}`);
const CV_PREVIEW_PARAMS = '#view=FitH&toolbar=0&navpanes=0&scrollbar=0';
const CV_MODAL_PARAMS = '#view=FitV&toolbar=0&navpanes=0&scrollbar=0';

function withBaseUrl(url: string) {
  if (!url) {
    return url;
  }

  if (/^(https?:)?\/\//.test(url)) {
    return url;
  }

  if (url.startsWith('/')) {
    return `${import.meta.env.BASE_URL}${url.slice(1)}`;
  }

  return url;
}

function ItchIoIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className="h-5 w-5 fill-current"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16 5C12.748 5 8.312 5.051 7.412 5.131C6.402 5.737 4.403 8.031 4.383 8.627L4.383 9.627C4.383 10.89 5.566 12 6.637 12C7.92 12 8.99 10.93 8.99 9.668C8.99 10.93 10.03 12 11.313 12C12.605 12 13.605 10.931 13.605 9.668C13.605 10.93 14.695 12 15.988 12L16.01 12C17.303 12 18.393 10.931 18.393 9.668C18.393 10.93 19.403 12 20.686 12C21.969 12 23.01 10.931 23.01 9.668C23.01 10.93 24.08 12 25.363 12C26.434 12 27.615 10.89 27.615 9.627L27.615 8.627C27.595 8.031 25.596 5.737 24.586 5.131C21.444 5.019 19.252 5 16 5ZM13.551 11.742C12.498 13.552 9.852 13.574 8.82 11.754C8.19 12.846 6.764 13.268 6.154 13.061C5.976 14.96 5.853 24.709 7.146 26.344C10.943 27.229 21.165 27.21 24.854 26.344C26.349 24.82 26.014 14.822 25.846 13.061C25.236 13.268 23.809 12.846 23.189 11.754C22.146 13.574 19.501 13.552 18.449 11.742C18.124 12.332 17.367 13.109 16 13.109C14.997 13.148 14.052 12.607 13.551 11.742ZM11.42 14.01C12.22 14.01 12.95 14 13.83 14.98C15.28 14.83 16.72 14.83 18.17 14.98C19.06 14.01 19.78 14.01 20.58 14.01C23.16 14.01 23.781 17.82 24.711 21.1C25.551 24.15 24.429 24.23 23.039 24.23C20.969 24.15 19.82 22.651 19.82 21.141C17.89 21.461 14.81 21.581 12.18 21.141C12.18 22.651 11.031 24.15 8.961 24.23C7.571 24.23 6.449 24.15 7.289 21.1C8.219 17.8 8.84 14.01 11.42 14.01ZM16 16.877C16 16.877 14.306 18.439 14 18.984L15.107 18.943L15.107 19.91C15.107 19.968 15.926 19.918 16 19.918C16.447 19.935 16.893 19.951 16.893 19.91L16.893 18.943L18 18.984C17.694 18.438 16 16.877 16 16.877Z" />
    </svg>
  );
}

function MarkdownContent({ content, project }: { content: string; project: Project }) {
  const blocks = content
    .trim()
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        if (block === "{{ITCH_BUTTON}}" && project.itchUrl) {
          return (
            <a
              key={index}
              href={project.itchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-primary px-5 py-3 text-sm font-medium text-primary transition-colors"
            >
              <span className="absolute inset-0 origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100" />
              <span className="relative z-10 transition-colors duration-300 group-hover:text-primary-foreground">
                {project.itchLabel ?? "Open on itch.io"}
              </span>
              <ExternalLink className="relative z-10 h-4 w-4 transition-colors duration-300 group-hover:text-primary-foreground" />
            </a>
          );
        }

        if (block.startsWith("# ")) {
          return (
            <h1 key={index} className="my-[5%] text-7xl font-black">
              {block.slice(2)}
            </h1>
          );
        }

        if (block.startsWith("## ")) {
          return (
            <h2 key={index} className="mb-0 text-2xl">
              {block.slice(3)}
            </h2>
          );
        }

        if (block.split("\n").every((line) => line.startsWith("- "))) {
          return (
            <ul key={index} className="space-y-3 pl-5 text-foreground">
              {block.split("\n").map((line) => (
                <li key={line} className="list-disc leading-relaxed">
                  {line.slice(2)}
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={index} className="text-foreground leading-relaxed">
            {block}
          </p>
        );
      })}
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  if (!project) {
    return (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 px-6 py-8 backdrop-blur-sm"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            onClose();
          }
        }}
      >
        <div
          className="modal-panel-enter w-full max-w-xl rounded-[1.5rem] border border-border bg-card p-8 shadow-xl"
          onMouseDown={(event) => event.stopPropagation()}
        >
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h1 className="mb-3">Project not found</h1>
              <p className="text-foreground leading-relaxed">
                The selected project page does not exist.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-foreground transition-colors hover:bg-muted hover:text-primary"
              aria-label="Close project"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 text-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to projects</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/30 px-4 py-6 backdrop-blur-sm sm:px-6 sm:py-8"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="mx-auto flex h-full max-w-6xl items-start justify-center">
        <div
          className="modal-panel-enter modal-scrollbar-hidden relative max-h-full w-full overflow-y-auto rounded-[1.75rem] border border-border bg-card shadow-xl"
          onMouseDown={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-full bg-card/90 p-2 text-foreground shadow-sm transition-colors hover:bg-muted hover:text-primary"
            aria-label="Close project"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="aspect-[16/8] bg-muted">
            <ImageWithFallback
              src={withBaseUrl(project.image)}
              fallbackSrc={project.fallbackImage}
              alt={project.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="px-8 pb-[10%] pt-8 md:px-[12%] md:pt-10 md:pb-[10%] lg:px-[20%]">
            <div className="mb-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-accent px-3 py-1 text-xs text-accent-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            <MarkdownContent content={project.markdown} project={project} />

            {project.workingProcess && (
              <div className="mt-14">
                <h2 className="mb-6 text-3xl">Working Process</h2>

                {project.workingProcess.images && project.workingProcess.images.length > 0 && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {project.workingProcess.images.map((image) => (
                      <figure
                        key={image.src}
                        className="overflow-hidden rounded-[1rem] border border-border bg-muted"
                      >
                        <img
                          src={withBaseUrl(image.src)}
                          alt={image.alt}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                        {image.caption && (
                          <figcaption className="px-4 py-3 text-sm text-muted-foreground">
                            {image.caption}
                          </figcaption>
                        )}
                      </figure>
                    ))}
                  </div>
                )}

                {project.workingProcess.documents && project.workingProcess.documents.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-3">
                    {project.workingProcess.documents.map((doc) => (
                      <a
                        key={doc.url}
                        href={withBaseUrl(doc.url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-primary px-5 py-3 text-sm font-medium text-primary transition-colors"
                      >
                        <span className="absolute inset-0 origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100" />
                        <span className="relative z-10 transition-colors duration-300 group-hover:text-primary-foreground">
                          {doc.label}
                        </span>
                        <ExternalLink className="relative z-10 h-4 w-4 transition-colors duration-300 group-hover:text-primary-foreground" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CvModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[100] bg-black/30 px-4 py-6 backdrop-blur-sm sm:px-6 sm:py-8"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="mx-auto flex h-full max-w-6xl items-start justify-center">
        <div
          className="modal-panel-enter modal-scrollbar-hidden relative max-h-full w-full overflow-y-auto rounded-[1.75rem] border border-border bg-card shadow-xl"
          onMouseDown={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-full bg-card/90 p-2 text-foreground shadow-sm transition-colors hover:bg-muted hover:text-primary"
            aria-label="Close CV"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center justify-between gap-4 border-b border-border px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-accent p-3 text-accent-foreground">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h3 className="mb-1 text-xl">View Resume</h3>
                <p className="text-sm text-muted-foreground">{CV_FILE_NAME}</p>
              </div>
            </div>
            <div className="mr-12 flex items-center gap-3 text-muted-foreground">
              <a
                href={CV_PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-primary"
                aria-label="Open CV in new tab"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
              <a
                href={CV_PDF_URL}
                download
                className="transition-colors hover:text-primary"
                aria-label="Download CV PDF"
              >
                <Download className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="bg-muted p-4">
            <div className="overflow-hidden rounded-[1rem] border border-border bg-white">
              <iframe
                src={`${CV_PDF_URL}${CV_MODAL_PARAMS}`}
                title="Nguyen Duc Son Hai CV Full Preview"
                className="h-[85vh] w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') {
      return 'white';
    }

    const savedTheme = window.localStorage.getItem('theme-mode');
    return savedTheme === 'black' ? 'black' : 'white';
  });
  const [hash, setHash] = useState(() => window.location.hash);
  const previousIsProjectRoute = useRef(false);
  const previousNonProjectHash = useRef('');
  const savedScrollY = useRef(0);
  const scrollAnimationFrame = useRef<number | null>(null);

  const stopSmoothScroll = () => {
    if (scrollAnimationFrame.current !== null) {
      cancelAnimationFrame(scrollAnimationFrame.current);
      scrollAnimationFrame.current = null;
    }
  };

  const smoothScrollToSection = (sectionId: string) => {
    const targetElement = document.getElementById(sectionId);
    if (!targetElement) {
      return;
    }

    stopSmoothScroll();

    const startY = window.scrollY;
    const targetY = Math.max(
      0,
      targetElement.getBoundingClientRect().top + window.scrollY - SECTION_SCROLL_OFFSET
    );
    const distance = targetY - startY;
    const duration = 700;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      window.scrollTo(0, startY + distance * easedProgress);

      if (progress < 1) {
        scrollAnimationFrame.current = requestAnimationFrame(step);
      } else {
        scrollAnimationFrame.current = null;
      }
    };

    scrollAnimationFrame.current = requestAnimationFrame(step);
  };

  const handleSectionLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    event.preventDefault();
    const nextHash = `#${sectionId}`;

    if (window.location.hash !== nextHash) {
      window.history.pushState(null, '', nextHash);
      setHash(nextHash);
    }

    smoothScrollToSection(sectionId);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode);
    window.localStorage.setItem('theme-mode', themeMode);
  }, [themeMode]);

  useEffect(() => {
    const handleHashChange = () => {
      const nextHash = window.location.hash;
      setHash(nextHash);

      if (isSectionHash(nextHash)) {
        smoothScrollToSection(nextHash.slice(1));
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const activeProjectSlug = getProjectSlugFromHash(hash);
  const activeProject = activeProjectSlug
    ? projects.find((project) => project.slug === activeProjectSlug) ?? null
    : null;
  const isProjectRoute = hash.startsWith('#/projects/');
  const isCvPreviewRoute = isCvPreviewHash(hash);
  const isOverlayRoute = isProjectRoute || isCvPreviewRoute;

  useEffect(() => {
    if (!isOverlayRoute) {
      previousNonProjectHash.current = hash;
    }
  }, [hash, isOverlayRoute]);

  useEffect(() => {
    const enteringProjectRoute = isOverlayRoute && !previousIsProjectRoute.current;
    const leavingProjectRoute = !isOverlayRoute && previousIsProjectRoute.current;

    if (enteringProjectRoute) {
      savedScrollY.current = window.scrollY;
      document.body.style.overflow = 'hidden';
    }

    if (leavingProjectRoute) {
      document.body.style.overflow = '';
      window.scrollTo({ top: savedScrollY.current, behavior: 'auto' });
    }

    previousIsProjectRoute.current = isOverlayRoute;

    return () => {
      if (!isOverlayRoute) {
        document.body.style.overflow = '';
      }
    };
  }, [isOverlayRoute]);

  useEffect(() => {
    if (!isOverlayRoute) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeOverlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOverlayRoute]);

  useEffect(() => {
    return () => {
      stopSmoothScroll();
      document.body.style.overflow = '';
    };
  }, []);

  const closeOverlay = () => {
    if (isOverlayRoute) {
      const nextHash = previousNonProjectHash.current;
      const nextUrl = `${window.location.pathname}${window.location.search}${nextHash}`;

      window.history.replaceState(null, '', nextUrl);
      setHash(nextHash);
    }
  };

  const openCvPreview = () => {
    const nextHash = '#/cv-preview';
    window.history.pushState(null, '', nextHash);
    setHash(nextHash);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-16">

        <header className="mb-24">
          <div className="mb-4 flex items-baseline justify-between gap-8">
            <h1 className="text-5xl leading-none">Nguyen Duc Son Hai</h1>
            <div className="flex items-center gap-6">
              <nav className="flex items-center gap-8 text-[1.35rem]">
                <a href="#about" onClick={(event) => handleSectionLinkClick(event, 'about')} className="text-foreground transition-colors hover:text-primary">About Me</a>
                <a href="#projects" onClick={(event) => handleSectionLinkClick(event, 'projects')} className="text-foreground transition-colors hover:text-primary">Projects</a>
                <a href="#cv" onClick={(event) => handleSectionLinkClick(event, 'cv')} className="text-foreground transition-colors hover:text-primary">CV</a>
              </nav>
              <div className="flex items-center gap-2 self-center rounded-full border border-border bg-card p-1">
                <button
                  type="button"
                  onClick={() => setThemeMode('white')}
                  className={`rounded-full p-2 transition-colors ${themeMode === 'white' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-primary'}`}
                  aria-label="Use white theme"
                >
                  <Sun className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setThemeMode('black')}
                  className={`rounded-full p-2 transition-colors ${themeMode === 'black' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-primary'}`}
                  aria-label="Use black theme"
                >
                  <Moon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          <p className="mb-6 text-lg text-muted-foreground">Game Developer</p>
          <div className="flex gap-4">
            <a
              href="https://hikamiii.itch.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-foreground transition-colors hover:text-primary"
              aria-label="itch.io"
            >
              <ItchIoIcon />
            </a>
            <a
              href="mailto:jackson.ndsh@gmail.com"
              className="inline-flex items-center gap-2 text-foreground transition-colors hover:text-primary"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/hikamiii"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-foreground transition-colors hover:text-primary"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/hai-nguyen-334a88298/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-foreground transition-colors hover:text-primary"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </header>

        <section id="about" className="mb-24 scroll-mt-8">
          <h2 className="mb-8 text-3xl">About Me</h2>
          <div className="max-w-3xl">
            <p className="mb-4 text-foreground leading-relaxed">
              I'm an indie game developer passionate about creating unique gaming experiences that challenge conventional gameplay mechanics.
              My work explores the intersection of narrative, mechanics, and player agency.
            </p>
            <p className="mb-4 text-foreground leading-relaxed">
              From platformers that use your past-self as a tool to voice-controlled horror experiences, I enjoy experimenting
              with unconventional ideas that push the boundaries of what games can be.
            </p>
            <p className="text-foreground leading-relaxed">
              When I'm not developing games, I'm exploring new game design concepts, playing indie titles, and dreaming up
              the next weird and wonderful game mechanic.
            </p>
          </div>
        </section>

        <section id="projects" className="mb-24 scroll-mt-8">
          <h2 className="mb-8 text-3xl">Projects</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <a
                key={project.slug}
                href={`#/projects/${project.slug}`}
                className="group block cursor-pointer rounded-lg p-4 pb-8 transition-all duration-150 hover:bg-primary/5 hover:ring-2 hover:ring-primary hover:[transform:rotate(var(--hover-rotate))]"
                style={{ "--hover-rotate": `${getHoverRotation(project.slug)}deg` } as CSSProperties}
              >
                <div className="mb-4 aspect-[16/10] overflow-hidden rounded-[0.25rem] bg-muted">
                  <ImageWithFallback
                    src={withBaseUrl(project.image)}
                    fallbackSrc={project.fallbackImage}
                    alt={project.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mb-2 text-xl">{project.title}</h3>
                <p className="mb-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-accent px-2 py-1 text-xs text-accent-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>

        <section id="cv" className="mb-24 scroll-mt-8">
          <h2 className="mb-8 text-3xl">CV</h2>
          <div className="w-full">
            <div
              role="button"
              tabIndex={0}
              onClick={openCvPreview}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  openCvPreview();
                }
              }}
              className="group block overflow-hidden rounded-[1.5rem] border border-border bg-card transition-all duration-150 hover:bg-primary/5 hover:ring-2 hover:ring-primary"
            >
              <div className="flex items-center justify-between gap-4 border-b border-border px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-accent p-3 text-accent-foreground">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-xl">View Resume</h3>
                    <p className="text-sm text-muted-foreground">{CV_FILE_NAME}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground transition-colors group-hover:text-primary">
                  <a
                    href={CV_PDF_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => event.stopPropagation()}
                    className="transition-colors hover:text-primary"
                    aria-label="Open CV in new tab"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                  <a
                    href={CV_PDF_URL}
                    download
                    onClick={(event) => event.stopPropagation()}
                    className="transition-colors hover:text-primary"
                    aria-label="Download CV PDF"
                  >
                    <Download className="h-5 w-5" />
                  </a>
                </div>
              </div>

              <div className="bg-muted p-4">
                <div className="relative">
                  <div className="relative overflow-hidden rounded-[1rem] border border-border bg-white">
                    <iframe
                      src={`${CV_PDF_URL}${CV_PREVIEW_PARAMS}`}
                      title="Nguyen Duc Son Hai CV"
                      className="pointer-events-none h-[24rem] w-full"
                    />
                  </div>
                  <div
                    className="absolute inset-0 cursor-pointer"
                    aria-hidden="true"
                    onClick={openCvPreview}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-border pb-16 pt-8">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">&copy; 2026 Nguyen Duc Son Hai. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#about" onClick={(event) => handleSectionLinkClick(event, 'about')} className="text-sm text-muted-foreground transition-colors hover:text-primary">About</a>
              <a href="#projects" onClick={(event) => handleSectionLinkClick(event, 'projects')} className="text-sm text-muted-foreground transition-colors hover:text-primary">Projects</a>
              <a href="#cv" onClick={(event) => handleSectionLinkClick(event, 'cv')} className="text-sm text-muted-foreground transition-colors hover:text-primary">CV</a>
            </div>
          </div>
        </footer>
      </div>

      {isProjectRoute && <ProjectModal project={activeProject} onClose={closeOverlay} />}
      {isCvPreviewRoute && <CvModal onClose={closeOverlay} />}
    </div>
  );
}
