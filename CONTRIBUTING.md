# Contributing

We welcome contributions. This guide covers how to report issues, develop features, and submit changes.


REPORTING ISSUES

Before creating a new issue, search existing issues to avoid duplicates. When reporting a bug, include the following information:

- Clear description of the problem
- Steps to reproduce the issue
- Expected behavior versus actual behavior
- Environment details (Node.js version, OS, browser version)
- Any relevant console logs or error messages

Use the issue templates provided in .github/ISSUE_TEMPLATE/ when creating new issues. Select the appropriate template for bug reports or feature requests.


DEVELOPMENT WORKFLOW

1. Fork the repository
2. Clone your fork locally
3. Create a new branch for your feature or fix
4. Make your changes following the code style guidelines
5. Write tests for new functionality
6. Run the test suite and linter to ensure everything passes
7. Commit your changes with a clear, descriptive commit message
8. Push your branch to your fork
9. Open a pull request against the main branch

Keep pull requests focused and atomic. Smaller, focused PRs are easier to review and merge.


CODE STYLE

This project uses TypeScript with strict mode enabled. Follow these guidelines:

- Use TypeScript for all new code
- Avoid using `any` type - use proper typing instead
- Follow the existing code patterns found in the source files
- Use meaningful variable and function names
- Keep functions small and focused
- Comment complex logic but prefer self-documenting code
- Run `npm run format` before committing to ensure consistent formatting
- Run `npm run lint` to check for issues and fix them


TESTING

All new features should include appropriate tests. This project uses Jest for testing.

Run the test suite:

```bash
npm test
```

Run tests in watch mode during development:

```bash
npm run test:watch
```

Run tests with coverage report:

```bash
npm run test:coverage
```

Ensure all tests pass before submitting a pull request.


LICENSE

By contributing to this project, you agree that your contributions will be licensed under the MIT License. See the LICENSE file for details.
