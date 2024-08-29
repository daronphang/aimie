import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { events } from './usecases';
import { TimelineEvent } from '@progress/kendo-angular-layout';

@Component({
  selector: 'app-usecase',
  templateUrl: './usecase.component.html',
  styleUrl: './usecase.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class UsecaseComponent implements AfterViewInit {
  protected events: TimelineEvent[] = events;
  protected slideConfig = { slidesToShow: 1, slidesToScroll: 1, dots: true, infinite: true };

  constructor(protected route: ActivatedRoute) {}

  ngAfterViewInit(): void {
    this.changeContentOfTimelineFlags();
    this.changeBorderOfCards();
  }

  private changeContentOfTimelineFlags(): void {
    const elements = document.querySelectorAll('.k-timeline-flag');
    elements.forEach(row => {
      if (row.innerHTML === '2011') {
        row.innerHTML = 'Supply Chain';
      } else if (row.innerHTML === '2012') {
        row.innerHTML = 'Procurement';
      } else if (row.innerHTML === '2013') {
        row.innerHTML = 'Production';
      } else if (row.innerHTML === '2014') {
        row.innerHTML = 'Maintenance';
      } else if (row.innerHTML === '2015') {
        row.innerHTML = 'Quality';
      } else if (row.innerHTML === '2016') {
        row.innerHTML = 'Delivery';
      }
    });
  }

  private changeBorderOfCards(): void {
    const elements = document.querySelectorAll('.k-card');
    elements.forEach(row => {
      if (row.innerHTML.includes('AI/ML-based Demand Forecasting')) {
        row.classList.add('zone--scl');
      } else if (row.innerHTML.includes('AI-enabled')) {
        row.classList.add('zone--hq');
      } else if (row.innerHTML.includes('Process Optimisation (Set Point)')) {
        row.classList.add('zone--shopfloor');
      } else if (row.innerHTML.includes('GenAI Maintenance Chatbot')) {
        row.classList.add('zone--shopfloor');
      } else if (row.innerHTML.includes('Prescriptive Maintenance')) {
        row.classList.add('zone--shopfloor');
      }
    });
  }

  protected extractScenario(v: string): string {
    const start = v.indexOf('<scenario>') + 10;
    const end = v.indexOf('</scenario>');
    return v.substring(start, end);
  }

  protected extractTechnology(v: string): string {
    const start = v.indexOf('<technology>') + 12;
    const end = v.indexOf('</technology>');
    return v.substring(start, end);
  }

  protected extractValue(v: string): string {
    const start = v.indexOf('<value>') + 7;
    const end = v.indexOf('</value>');
    return v.substring(start, end);
  }
}
