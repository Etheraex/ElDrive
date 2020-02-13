#include "stdio.h"
#include "unistd.h"
#include "string.h"
#include <stdlib.h>

struct Projects {
	char name[20];
	char path[128];
};

static char basePath[1024];

static struct Projects projectsArray[] = {
	{"auth", "/auth-service"},
	{"file", "/file-service"},
	{"stats", "/statistics-Service"},
	{"notes", "/note-service"},
	{"angular", "/frontend"}
};

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

	getcwd(basePath, sizeof(basePath));

	int mainPID = getpid();
	int numOfProjects = sizeof(projectsArray) / sizeof(projectsArray[0]);

	for (int i = 0; i < numOfProjects - 1; i++)
		if (getpid() == mainPID && fork() == 0){
			startDotnetProcess(projectsArray[i].path);
			sleep(10);
		}
			

	if (getpid() == mainPID)
		startAngularProcess(numOfProjects - 1);

}