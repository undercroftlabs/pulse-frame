# Contributing

Thank you for considering contributing to Pulse!
Please read the following guidelines carefully to ensure a smooth process.

Before making a change, please discuss it via an issue, pull request, or other communication method.

We also have a Code of Conduct that all contributors are expected to follow.

## Pull Request Process

- Discuss your proposed changes first if they are large or impact public behavior.
- Ensure that all install or build dependencies are properly cleaned up.
- Update the documentation (README, comments, etc.) to reflect any public-facing changes.
- Follow SemVer — do not bump version numbers in PRs.
- Pull Requests may be merged once they are reviewed and approved by mikejg101.
- If you do not have merge permissions, request a maintainer to merge after approval.

## Choosing Dependencies

Pulse has a strong philosophy around external dependencies.
To keep the project lightweight, secure, and maintainable, adding a new dependency must follow these principles:

Dependency Acceptance Criteria

- Self-contained
  The library must do one thing well without introducing unnecessary functionality.

- Lightweight
  It must have minimal impact on install size and runtime performance.

- Isolated
  It should not tightly couple with core Pulse internals or modify behavior globally.

- Replaceable
  It should be easy to remove or replace the library in the future.

- Non-breaking
  If the feature is disabled (e.g., compression), the library must introduce zero runtime overhead.

- Secure
  Libraries that interact with network, compression, or encryption must have no known vulnerabilities.

### Dependency Review Process

When proposing a new dependency:

- Provide a short description and justification.
- Include links to the library’s source code and documentation.
- Explain how it satisfies the acceptance criteria.
- List any alternative approaches considered (e.g., built-ins, manual implementation).

### Examples

| Feature                    | Dependency                 | Accepted? | Notes                                   |
| -------------------------- | -------------------------- | :-------: | --------------------------------------- |
| permessage-deflate support | Node.js built-in `zlib`    |    ✅     | Lightweight, native compression support |
| Core WebSocket handling    | External WebSocket library |    ❌     | Pulse implements its own protocol logic |

## Code of Conduct

### Our Pledge

In the interest of fostering an open and welcoming environment, we as
contributors and maintainers pledge to making participation in our project, and
our community a harassment-free experience for everyone, regardless of age, body
size, disability, ethnicity, gender identity and expression, level of experience,
nationality, personal appearance, race, religion, or sexual identity and
orientation.

### Our Standards

Examples of behavior that contributes to creating a positive environment
include:

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

Examples of unacceptable behavior by participants include:

- The use of sexualized language or imagery and unwelcome sexual attention or
  advances
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information, such as a physical or electronic
  address, without explicit permission
- Other conduct which could reasonably be considered inappropriate in a
  professional setting

### Our Responsibilities

Project maintainers are responsible for clarifying the standards of acceptable
behavior and are expected to take appropriate and fair corrective action in
response to any instances of unacceptable behavior.

Project maintainers have the right and responsibility to remove, edit, or
reject comments, commits, code, wiki edits, issues, and other contributions
that are not aligned to this Code of Conduct, or to ban temporarily or
permanently any contributor for other behaviors that they deem inappropriate,
threatening, offensive, or harmful.

### Scope

This Code of Conduct applies both within project spaces and in public spaces
when an individual is representing the project or its community. Examples of
representing a project or community include using an official project e-mail
address, posting via an official social media account, or acting as an appointed
representative at an online or offline event. Representation of a project may be
further defined and clarified by project maintainers.

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be
reported by contacting the project team at [INSERT EMAIL ADDRESS]. All
complaints will be reviewed and investigated and will result in a response that
is deemed necessary and appropriate to the circumstances. The project team is
obligated to maintain confidentiality with regard to the reporter of an incident.
Further details of specific enforcement policies may be posted separately.

Project maintainers who do not follow or enforce the Code of Conduct in good
faith may face temporary or permanent repercussions as determined by other
members of the project's leadership.

### Attribution

This Code of Conduct is adapted from the [Contributor Covenant][homepage], version 1.4,
available at [http://contributor-covenant.org/version/1/4][version]

[homepage]: http://contributor-covenant.org
[version]: http://contributor-covenant.org/version/1/4/
