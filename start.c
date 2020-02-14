#include "stdio.h"
#include <unistd.h>
#include "string.h"
#include <stdlib.h>
#include <signal.h>
sigset_t signals;

struct Projects {
	char name[20];
	char path[128];
};

static char basePath[1024];
int pids [5];
int pid = -1;
static struct Projects projectsArray[] = {
	{"auth", "/auth-service"},
	{"file", "/file-service"},
	{"stats", "/statistics-Service"},
	{"notes", "/note-service"},
	{"angular", "/frontend"}
};

void signal_handler(int signum)
{
    int i=0;
    for(i;i<5;i++)
    {
        kill(pids[i],SIGKILL);
    }
	exit(0);
}

char* createWorkingPath(char* folderName) {
	strcat(basePath, folderName);
	return basePath;
}

void startDotnetProcess(char* folderName) {
	chdir(createWorkingPath(folderName));
	system("dotnet run");
}

void startAngularProcess(int last) {
	chdir(createWorkingPath(projectsArray[last].path));
	system("ng serve");
}

int main(void) {
	signal(SIGTERM,signal_handler);
	getcwd(basePath, sizeof(basePath));

	int mainPID = getpid();
	int numOfProjects = sizeof(projectsArray) / sizeof(projectsArray[0]);

	for (int i = 0; i < numOfProjects - 1; i++){
		if (getpid() == mainPID){
			 if(pid!=0)  
			{
        		pid = fork();
        		pids[i] = pid;
        	}
			if(pid == 0)
			{
				sleep((rand()%100)/100*0.01);
				startDotnetProcess(projectsArray[i].path);
				
				break;
			}
		}
		if(getpid() == mainPID)		
		sleep(0.2);
	}

	if (getpid() == mainPID)
	{
			 if(pid!=0)  
			{
        		pid = fork();
        		pids[4] = pid;
        	}
			if(pid == 0)
		startAngularProcess(numOfProjects - 1);
	}
    sigsuspend(&signals);
    return 0;
}