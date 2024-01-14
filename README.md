## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


## Guides

#### Connect local repository to cloud repository in Github

1. Open your Git Bash and navigate to the repository that needs to be linked.
```bash
/abc > 
```

2. Check if the repository is clean and there is nothing outstanding by using `git status` command.
```bash
/abc > git status
On branch main

No commits yet
```

3. Use `git remote` command with URL of cloud repository.
```bash
/abc > git remote origin https://github.com/username/abc.git
```

4. Go ahead and use `git remote -v` command to re-check.
```bash
/abc > git remote -v
origin  https://github.com/username/abc.git (fetch)
origin  https://github.com/username/abc.git (push)
```

#### Displaying a pending visual state in Client component using useTransition

```js
import { useTransition } from 'react'

const ClientComponent = () => {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      // Call server action
    });
  }

  if (isPending) {
    return <p>Pending...</p>
  }
  else {
    return <button onClick={onClick}>Click here!</button>
  }
}
```

> See more: https://react.dev/reference/react/useTransition#displaying-a-pending-visual-state-during-the-transition





