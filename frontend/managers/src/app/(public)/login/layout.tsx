import styles from './style.module.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className={`${styles.background} w-full min-h-auto flex flex-col
    bg-white dark:bg-zinc-900`}>
      {children}
    </main>
  );
}
