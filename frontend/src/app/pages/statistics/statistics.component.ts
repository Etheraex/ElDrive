import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/services/statistics.service';
import { Statistics } from 'src/app/models/statistics.model';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

	data : Statistics;
	constructor(private statisticsService : StatisticsService) {
		this.data = new Statistics();
	 }

	ngOnInit() {
	this.statisticsService.getStatistics()
	.subscribe((result : Statistics) => {
		this.data = result;
		console.log(this.data);
	})
	}

}
