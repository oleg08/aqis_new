import { Injectable } from '@angular/core';
import { AssistantProgressesPropsService } from './assistant-progresses-props.service';
import { DifferenceArraysService } from '../services/difference-arrays.service';
import {ProgressAssistant, ProgressAssistantByProject, ProgressAssistantProject} from './progress-assistant/progress-assistant.component';

@Injectable({
  providedIn: 'root'
})
export class DifferenceReportsService {

  constructor(private assistantProgressesProps: AssistantProgressesPropsService, private differenceArray: DifferenceArraysService) { }

  handler (reports1: ProgressAssistant[], reports2: ProgressAssistant[]) {
    const self = this;
    const reports: ProgressAssistant[] = [];
    reports2.forEach(report2 => {
      const report: ProgressAssistant = { assistant: report2.assistant, projects: [] };
      const report1: ProgressAssistant = reports1.find(r => r.assistant === report2.assistant);
      report2.projects.forEach(project2 => {
        const project1: ProgressAssistantProject = report1.projects.find(p => p.name === project2.name);

        const project: ProgressAssistantProject = { name: project2.name, progresses: [] };
        if (!project1) {
          project.progresses = project2.progresses;
          self.assistantProgressesProps.projectProps().forEach(prop => project[prop] = project2[prop]);
        } else {
          self.assistantProgressesProps.projectProps().forEach(prop => { project[prop] = project2[prop] - project1[prop]; });

          project2.progresses.forEach(progress2 => {
            const progress: ProgressAssistantByProject = { company: progress2.company };
            const progress1: ProgressAssistantByProject = project1.progresses.find(prg => prg.company === progress2.company);
            if (!progress1) {
              self.assistantProgressesProps.progressProps().forEach(prop => { progress[prop] = progress2[prop]; });
            } else {
              self.assistantProgressesProps.progressProps().forEach(prp => {
                progress[prp] = Number(progress2[prp]) - Number(progress1[prp]);
              });
              progress.succeed = progress2.succeed;
              progress.failed = progress2.failed;
              progress.in_progress = progress2.in_progress;
            }

            project.progresses.push(progress);
          });
          const missedProgresses: ProgressAssistantByProject[] =
            self.differenceArray.uniqueInArray1(project1.progresses, project2.progresses, 'company');
          if (missedProgresses.length > 0) { missedProgresses.forEach(pr => project.progresses.push(pr)); }
        }
        report.projects.push(project);
      });

      const missedProjects: ProgressAssistantProject[] =
        self.differenceArray.uniqueInArray1(report1.projects, report2.projects, 'name');
      if (missedProjects.length > 0) { missedProjects.forEach(p => report.projects.push(p)); }

      self.assistantProgressesProps.reportProps().forEach(prop => { report[prop] = report2[prop] - report1[prop]; });
      reports.push(report);
    });

    const missedReports: ProgressAssistant[] = self.differenceArray.uniqueInArray1(reports1, reports2, 'assistant');
    if (missedReports.length > 0) { missedReports.forEach(report => reports.push(report)); }

    return reports;
  }
}
