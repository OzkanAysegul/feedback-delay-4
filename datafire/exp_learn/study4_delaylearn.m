% script_learn_temp.m
% 
% 


clear
close all

warning('off','MATLAB:textio:io:UnableToGuessFormat')
warning('off','MATLAB:datetime:AmbiguousDateString')
%#ok<*NANMEAN> 


%dataTable = table();

% loop through each file
% fileList= {
% 'taskdata_230727_121115_exp_learn_5fb28c1bf350e788b6412b0e.csv'
% 'taskdata_230727_134222_exp_learn_63e64f39956f8fe1af81883e.csv'
% 'taskdata_230802_235047_exp_learn_60fd310fff5b2600c9d95554.csv'
% };

temp = readtable('../start_data_exp_learn.csv');
learnList = temp.filename;
learnList(:,2) = temp.prolificID;
[~,b,c] = ymd(temp.date);
[d,e] = hms(temp.start_time);
learnList(:,3) = num2cell(b*1000000 + c*10000 + d*100 + e);
learnList = sortrows(learnList,2);

% first two subjects with error in surveys
% 5e85f667db8aa41f74436a9f
% 641373f8117053037093d10a

excludelist = {
'6018260b22d0500008f32d1f' % in case ew data included
'5e85f667db8aa41f74436a9f' % listc3 error
'641373f8117053037093d10a' % listc3 error
'60ec1dd7eaa54649ce2bdd3f' % listc3 error
}

if ~isempty(excludelist)
    exclany = 0;
    for x = 1:length(excludelist)
        if max(strcmp(learnList(:,2),excludelist{x})==1)
            subjko = find(strcmp(learnList(:,2),excludelist{x})==1);
            learnList{subjko,1} = NaN;
            learnList{subjko,2} = NaN;
            learnList{subjko,3} = NaN;
            exclany = 1;
        end
    end
    if exclany
        learnList(cellfun(@(x) any(isnan(x)),learnList)) = [];
        learnList = reshape(learnList,length(learnList)/3,3);
    end
end

% learnList{end+1} = 'taskdata_230000_000000_exp_learn_611fe0f24abe3cc63f4fd424.csv'; % example of adding data



temp = readtable('../start_data_exp_test.csv');
testList = temp.filename;
testList = sortrows(testList);
clear temp

% temp = readtable('../start_data_exp_test_day2.csv');
% testday2List = temp.filename;
% % testday2List = sortrows(testday2List);
% clear temp

temp = readtable('../start_data_exp_survey.csv');
surveyList = temp.filename;
clear temp

% temp = readtable('../start_data_exp_fwdspan.csv');
% fwdList = temp.filename;
% clear temp

npairs = 6;
nreps = 18;
ntrials = npairs*nreps;


learn_perf = NaN(size(learnList,1),18);
learn_all_perf = NaN(size(learnList,1),18);
learn_slide_perf = learn_perf;
learn_rep_perf = learn_perf;
learn_repdel_perf = learn_perf;
learn_repimm_perf = learn_perf;
learn_alltrials_perf = NaN(size(learnList,1),ntrials);
learn_perf_name = cell(size(learnList,1),8);
learn_responses = learn_perf;
learn_breakdur = NaN(size(learnList,1),12);
learn_reptime = NaN(size(learnList,1),17);
learn_mood = NaN(size(learnList,1),16);
learn_mood_rt = NaN(size(learnList,1),32);

test_choice = NaN(size(learnList,1),12);
test_rate = NaN(size(learnList,1),12);
test_time = NaN(size(learnList,1),6);

test_day2_choice = NaN(size(learnList,1),12);
test_day2_rate = NaN(size(learnList,1),12);

% fwd_perf = NaN(size(learnList,1),6);

post_perf = NaN(size(learnList,1),14);
post_day2_perf = NaN(size(learnList,1),14);

survey_phq = NaN(size(learnList,1),2);
survey_gad = NaN(size(learnList,1),2);
survey_stai = NaN(size(learnList,1),2);
survey_sds = NaN(size(learnList,1),2);
survey_aes = NaN(size(learnList,1),2);
survey_masq = NaN(size(learnList,1),2);
survey_sticsa = NaN(size(learnList,1),2);
survey_pvss = NaN(size(learnList,1),2);




for i = 1:size(learnList,1)
    
    excludelearn = 0;
    learnTable = [];
    testTable = [];
    testday2Table = [];
    postTable = [];
    
    % read the learning csv file into a table
    learnname = learnList{i};
    if strcmp(learnname(2),'t')
        learnname = learnname(2:end-1);
    end
    
    subjid = learnname(34:end-4);
    subjtime = learnname(10:22);
    learn_perf_name{i,1} = subjid;
    learn_perf_name{i,2} = subjtime;

    if exist(learnname,'file')
        learnTable = readtable(learnname);
    else
        learnpavname = ['../../data_Pavlovia/prereg_raw_learn_110/prereg_learningdata_' subjid '.csv'];
        if exist(learnpavname,'file')
            learnTable = readtable(learnpavname);
        end 
    end
    
    
    testname = ['taskdata_' subjtime '_exp_test_' subjid '.csv'];
    
    hastest = 0;
    if exist(['../exp_test/' testname],'file')
        testTable = readtable(['../exp_test/' testname]);
        test_choice(i,1) = size(testTable,1);
        if size(testTable,1)>50 % test ? lines currently
            hastest = 1;
        end
    end
    if hastest==0
        testpavname = ['../../data_Pavlovia/prereg_raw_test_110/prereg_testdata_' subjid '.csv'];
        if exist(testpavname,'file')
            testTable = readtable(testpavname);
            testTable = testTable(testTable.exp_stage == "test",:);
            hastest = 1;
            test_choice(i,1) = size(testTable,1);
        end
    end
    
    
    hastestday2 = 0;
    % for iT = 1:length(testday2List)
    %     temp = testday2List{iT};
    %     temp = temp(39:end-5);
    %     if (strcmp(temp,subjid))
    %         testday2name = testday2List{iT};
    %         testday2name = testday2name(2:end-1);
    %         if exist(['../exp_test_day2/' testday2name],'file')
    %             testday2Table = readtable(['../exp_test_day2/' testday2name]);
    %             testday2Cell = readcell(['../exp_test_day2/' testday2name]);
    %             if size(testday2Table,1)>=47
    %                 hastestday2 = 1;
    %             else
    %                 x = 1
    %             end
    %         end
    %     end
    %     clear temp
    % end
    
    
    
    
    haslearn = 0;
    if size(learnTable,1)>640 % learn 645 lines currently
        haslearn = 1;
    end
    %elseif strcmp('63f8f2c2941d27adb3d9eb67',subjid) % case with last trial missing 63f8f2c2941d27adb3d9eb67
    %    haslearn = 1;
    %elseif strcmp('6018260b22d0500008f32d1f',subjid) % remove elliott data
    %    haslearn = 0;
    %elseif exist(['taskdata_' subjid '.csv'],'file')
    %    learnTable = readtable(['taskdata_' subjid '.csv']);
    %    haslearn = 1;
    %else
    %%% pavlovia load
    %        filt_learn = learnTable((learnTable.test_part == "trial" & ~(learnTable.feedback_duration_times == "[3000]")), :);
    %end
    
    
    haspost = 0;
    postname = ['../exp_post_survey/taskdata_' subjtime '_exp_post_survey_' subjid '.csv'];
    if exist(postname,'file')
        postTable = readtable(postname);
        if size(postTable,1)==13
            haspost = 1;
        end
    end
    
    
    learn_perf(i,1) = size(learnTable,1);
    

    hasfwd = 0;
    % fwdname = ['../exp_fwdspan/taskdata_' subjtime '_exp_fwdspan_' subjid '.csv'];
    % for iT = 1:length(fwdList)
    %     temp = fwdList{iT};
    %     temp = temp(37:end-5);
    %     if (strcmp(temp,subjid))
    %         surveyname = fwdList{iT};
    %         surveyname = surveyname(2:end-1);
    %         if exist(['../exp_fwdspan/' surveyname],'file')
    %             fwdTable = readtable(['../exp_fwdspan/' surveyname]);
    %             if size(fwdTable,1)>19
    %                 hasfwd = 1;
    %             end
    %         end
    %     end
    %     clear temp
    % end
    
    
    hassurvey = 0;
    for iT = 1:length(surveyList)
        temp = surveyList{iT};
        temp = temp(36:end-5);
        if (strcmp(temp,subjid))
            surveyname = surveyList{iT};
            surveyname = surveyname(2:end-1);
            if exist(['../exp_survey/' surveyname],'file')
                surveyTable = readtable(['../exp_survey/' surveyname]);
                if size(surveyTable,1)>19 && haslearn
                    hassurvey = 1;
                end
            end
        end
        clear temp
    end
    
    
    learn_perf_name{i,4} = hastestday2;
    learn_perf_name{i,5} = hassurvey;
    %learn_perf_name{i,6} = missingsurveydata;
    %learn_perf_name{i,7} = surveyparticipated;
    
    

    %%%%%%%%%%%%%
    %%% learn %%%
    %%%%%%%%%%%%%
    if haslearn
        
        m = 1;
        learnTable.time_mod = learnTable.time_elapsed;
        for iT = 1:size(learnTable,1)
            if strcmp(learnTable.test_part(iT),'break')
                dur_break = learnTable.time_mod(iT+2)-learnTable.time_mod(iT-1);
                learnTable.time_mod(iT:end) = learnTable.time_mod(iT:end)-dur_break;
                learn_breakdur(i,m) = dur_break/1000;
                learn_breakdur(i,m+6) = iT;
                m = m+1;
            end
        end
        
        % get mood ratings aligned
        learnTable.response_mood = learnTable.response;
        learnTable.response_mood(1:end-5) = learnTable.response_mood(6:end);
        
        % filter the data based on the test_part column
        filt_learn = learnTable((learnTable.test_part == "trial" & ~(learnTable.feedback_duration_times == 3000)), :);
        
        %filt_learn.trial_index(1);
        
        
        filt_mood_learn = learnTable((learnTable.test_part == "mood_trial" & ~(learnTable.feedback_duration_times == 3000)), :);
        
        filt_mood_lbase = learnTable((learnTable.test_part == "mood_baseline" & ~(learnTable.feedback_duration_times == 3000)), :);
        
        m = 1;
        learn_ind_reptime = [];
        for iT = 1:size(filt_learn,1)
            if (iT>1) && (rem(iT,npairs)==1)
                learn_ind_reptime(m,1) = (filt_learn.time_mod(iT)-filt_learn.time_mod(iT-npairs))/1000;
                m = m+1;
            end
        end
        
        learn_reptime(i,:) = learn_ind_reptime;
        
        % get mood reaction time
        for iT = 1:size(filt_mood_learn,1)
            % get rid of practice phase mood rating
            if filt_mood_learn.trial_index(iT)>filt_learn.trial_index(1)
                if isnumeric(filt_mood_learn.rt(iT))
                    learn_mood_rt(i,iT-1) = filt_mood_learn.rt(iT)/1000;
                elseif strcmp(filt_mood_learn.rt(iT),'null')
                    learn_mood_rt(i,iT-1) = NaN;
                else
                    learn_mood_rt(i,iT-1) = str2num(cell2mat(filt_mood_learn.rt(iT)))/1000;
                end
            end
        end
        
        rtall = NaN(size(filt_learn.rt,1),1);
        if iscell(filt_learn.rt)
            for j = 1:size(filt_learn,1)
                if strcmp(filt_learn.rt{j},'null')
                else
                    rtall(j,1) = str2num(filt_learn.rt{j});
                end
            end
        else
            rtall = filt_learn.rt;
        end
        if 1==1
            learn_responses(i,2) = sum(isnan(rtall));
            learn_responses(i,3) = nanmean(rtall(73:end));
            %learn_responses(i,4) = nanmean(filt_learn_long.rt(37:end));
            %learn_responses(i,5) = nanmean(filt_learn_short.rt(37:end));
            
            tempmissed = (isnan(rtall))+0;
            filt_learn.response_correct(tempmissed==1) = NaN;
        end
        
        
        
        filt_learn_long = filt_learn((filt_learn.test_part == "trial" & filt_learn.feedback_duration_times == 7000), :);
        filt_learn_short = filt_learn((filt_learn.test_part == "trial" & filt_learn.feedback_duration_times == 750), :);
        
        % (npairs=6) 91 gets last 3 repetitions
        % (npairs=6) 85 gets last 4 repeitions
        ntlast3rep = 91;
        ntlast4rep = 85;
        ntlast1rep = 103;
        ntfirst10rep = 60;
        learn_perf(i,2) = nanmean(filt_learn.response_correct);
        learn_perf(i,3) = nanmean(filt_learn.response_correct(7:ntfirst10rep)); % first 10 repetitions
        learn_perf(i,4) = nanmean(filt_learn.response_correct(ntlast4rep:end)); % last 4 repetitions repetition
        learn_perf(i,5) = nanmean(filt_learn.response_correct(ntlast3rep:end)); % last 3 repetitions repetition
        learn_perf(i,6) = nanmean(filt_learn.response_correct(ntlast1rep:end)); % last repetition
        
        % last n repetitions for short, long separately
        nthalflast2rep = 43; % gets last 2 repetitions
        nthalflast3rep = 37; % gets last 3 repetitions
        nthalflast4rep = 31; % gets last 4 repetitions
        learn_perf(i,7) = nanmean(filt_learn_long.response_correct(57:end));
        learn_perf(i,8) = nanmean(filt_learn_short.response_correct(57:end));
        learn_perf(i,9) = nanmean(filt_learn_long.response_correct(61:end));
        learn_perf(i,10) = nanmean(filt_learn_short.response_correct(61:end));
        learn_perf(i,11) = nanmean(filt_learn_long.response_correct(65:end));
        learn_perf(i,12) = nanmean(filt_learn_short.response_correct(65:end));
        
        tstart = 1;
        tend = 24;
        for iR = 1:14
            %if length(filt_learn.response_correct)==(ntrials-1) && (tend == ntrials)
            %    tend = ntrials-1;
            %end
            learn_slide_perf(i,iR) = nanmean(filt_learn.response_correct(tstart:tend)); % last repetition
            tstart = tstart+npairs;
            tend = tend+npairs;
        end
        
        tstart = 1;
        tend = npairs;
        for iR = 1:nreps
            %if length(filt_learn.response_correct)==(ntrials-1) && (tend == 108)
            %    tend = ntrials-1;
            %end
            learn_rep_perf(i,iR) = nanmean(filt_learn.response_correct(tstart:tend));
            tstart = tstart+npairs;
            tend = tend+npairs;
        end
        
        tstart = 1;
        tend = npairs/2;
        for iR = 1:nreps
            
            learn_repdel_perf(i,iR) = nanmean(filt_learn_long.response_correct(tstart:tend));
            
            %if length(filt_learn_short.response_correct)==71 && (tend == 72)
            %    tend = 71;
            %end
            
            learn_repimm_perf(i,iR) = nanmean(filt_learn_short.response_correct(tstart:tend));
            tstart = tstart+(npairs/2);
            tend = tend+(npairs/2);
        end

        
        tempincrement = 3;
        tempend = npairs;
        for iR = 1:ntrials
            if size(filt_learn,1)>=tempend
                learn_all_perf(i,iR) = nanmean(filt_learn.response_correct(tempend-tempincrement+1:tempend));
            else
                learn_all_perf(i,iR) = nanmean(filt_learn.response_correct(tempend-tempincrement+1:end));
            end
            tempend = tempend+tempincrement;
        end
        
        % all trials moving window mean, window 8 trials
        nwindow = 8;
        if size(filt_learn,1)==(ntrials-1)
            learn_alltrials_perf(i,1:end-1) = movmean(filt_learn.response_correct,nwindow,'omitnan');
        else
            learn_alltrials_perf(i,:) = movmean(filt_learn.response_correct,nwindow,'omitnan');
        end
        
        
        % exclusion criteria
        % 
        % (npairs=6) 91 gets last 3 repetitions
        % (npairs=6) 85 gets last 4 repeitions
        % 
        % equal or greater than 14 of 24 last trials correct
        % 14 or more missed trials of 108 total
        % .667 is 4/6 (last 1 rep); .583 is 7/12 (last 2 reps); .555 is 10/18 (last 3 reps)
        % previously with 8 pairs (14/24) = 0.5833
        exclvalue = (11/18); % with 6 pairs = 0.6111
        
        % missed trial exclusion criteria
        ntrialsmissed = 14; % more than 12.5% of trials missed
        
        % last 3 repetitions exclusion criterion
        learnlast3 = filt_learn.response_correct(ntlast3rep:end);
        learnlast3missedzero = learnlast3;
        learnlast3missedzero(isnan(learnlast3missedzero)) = 0;
        if nanmean(learnlast3)<exclvalue
            excludelearn = 1;
        elseif nanmean(learnlast3missedzero)<exclvalue % adds no more subjects when replacing missing with nearby answers
            
            % console
            subjid;
            rep10to12 = nanmean(filt_learn.response_correct(55:72));
            rep13to15 = nanmean(filt_learn.response_correct(73:90));
            
            pairlast3 = filt_learn.pair(ntlast3rep:end);
            learnlast3mod = learnlast3;
            for iT = 1:length(learnlast3mod)
                if isnan(learnlast3mod(iT))
                    currpair = pairlast3(iT);
                    pairtrials = find(pairlast3==currpair);
                    perfmissed = nanmean(learnlast3(pairtrials));
                    learnlast3mod(iT) = perfmissed;
                end
            end
            
            % console
            nanmean(learnlast3mod);
            
            if nanmean(learnlast3mod)<exclvalue
                excludelearn = 1;
            end
        elseif learn_responses(i,2)>ntrialsmissed % missed trial exclusion
            excludelearn = 1;
            learn_perf(i,15:17) = NaN;
            excludetrialsmissed = 1
        end
        
        learn_perf_name{i,8} = excludelearn;
        
        if excludelearn
            learn_perf(i,15) = learn_perf(i,5);
            learn_perf(i,16) = learn_perf(i,9);
            learn_perf(i,17) = learn_perf(i,10);
            learn_perf(i,2:13) = NaN;
            learn_all_perf(i,:) = NaN;
            learn_slide_perf(i,:) = NaN;
            %learn_rep_perf(i,:) = NaN;
            learn_repdel_perf(i,:) = NaN;
            learn_repimm_perf(i,:) = NaN;
            learn_alltrials_perf(i,:) = NaN;
        end
        
        learn_perf(i,14) = excludelearn;
        
        learn_perf_name{i,3} = abs(excludelearn-1);
        
        % mood analysis
        response_mood = [];
        for j = 1:size(filt_learn)
            if ~(strcmp(filt_learn.response_mood{j},'j') && ~(strcmp(filt_learn.response_mood{j},'f')))
                response_mood(j,1) = str2double(filt_learn.response_mood{j});
            else
                response_mood(j,1) = NaN;
            end
        end
        filt_learn.response_mood = response_mood;
        clear response_mood
        
        
        for j = 1:size(filt_mood_learn.response)
            if ~(isempty(filt_mood_learn.response{j}))
                temp_mood(j,1) = str2double(filt_mood_learn.response{j});
            else
                temp_mood(j,1) = NaN;
            end
        end
        filt_mood_learn.response = temp_mood;
        clear temp_mood
        
        for j = 1:size(filt_mood_lbase.response)
            if ~(isempty(filt_mood_lbase.response{j}))
                temp_mood(j,1) = str2double(filt_mood_lbase.response{j});
            else
                temp_mood(j,1) = NaN;
            end
        end
        filt_mood_lbase.response = temp_mood;
        clear temp_mood
        
        
        learn_mood(i,1) = NaN;
        learn_mood(i,2) = nanmean(filt_mood_learn.response);
        
        % baseline mood
        learn_mood(i,3) = nanmean(filt_mood_lbase.response);
        
        [r,~] = corr(filt_learn.response_mood,filt_learn.response_rewarded,'rows','complete');
        learn_mood(i,5) = r;
        learn_mood(i,6) = fisherz(r);
        
        [r,~] = corr(filt_learn.response_mood(1:72),filt_learn.response_rewarded(1:72),'rows','complete');
        learn_mood(i,7) = r;
        learn_mood(i,8) = fisherz(r);
        
        % mood-outcome correlation for delay trials separate from imm trials
        [r,~] = corr(filt_learn.response_mood(filt_learn.feedback_duration_times==7000),filt_learn.response_rewarded(filt_learn.feedback_duration_times==7000),'rows','complete');
        learn_mood(i,9) = fisherz(r);
        [r,~] = corr(filt_learn.response_mood(filt_learn.feedback_duration_times==750),filt_learn.response_rewarded(filt_learn.feedback_duration_times==750),'rows','complete');
        learn_mood(i,10) = fisherz(r);
        
        % response to reward minus baseline and miss minus baseline
        learn_mood(i,12) = nanmean(filt_learn.response_mood(filt_learn.response_rewarded==1)) - learn_mood(i,3);
        learn_mood(i,13) = nanmean(filt_learn.response_mood(filt_learn.response_rewarded==0)) - learn_mood(i,3);
        
        clear r

    end
    
    
    
    %%%%%%%%%%%%%%
    %%%% test %%%%
    %%%%%%%%%%%%%%
    if hastest % && (excludelearn==0)
        
        test_choice(i,12) = 0;
        test_rate(i,12) = 0;
        
        % filter
        filt_test = testTable(testTable.test_part == "memory_choice", :);
        filt_test_conf = testTable(testTable.test_part == "confidence" | testTable.test_part == "memory_choice_confidence", :);
        filt_test.confidence = filt_test_conf.confidence;
        filt_test.rt_confidence = filt_test_conf.rt;
        clear filt_test_conf
        filt_test_del = filt_test(filt_test.delay == 1, :);
        filt_test_imm = filt_test(filt_test.delay == 0, :);
        
        filt_test_rate = testTable(testTable.test_part == "memory_rating", :);
        
        if iscell(filt_test_rate.response(1))
            for iT = 1:size(filt_test_rate,1)
                response(iT,1) = str2double(cell2mat(filt_test_rate.response(iT)));
            end
            filt_test_rate.response = response;
            clear response
        end
        
        filt_test_rate_del = filt_test_rate(filt_test_rate.delay == 1, :);
        filt_test_rate_imm = filt_test_rate(filt_test_rate.delay == 0, :);
        
        filt_test_time = testTable(testTable.test_part == "memory_time", :);
        if iscell(filt_test_time.response(1))
            for iT = 1:size(filt_test_time,1)
                response(iT,1) = str2double(cell2mat(filt_test_time.response(iT)));
            end
            filt_test_time.response = response;
            clear response
        end
        
        
        % choice
        test_choice(i,2) = nanmean(filt_test.response_correct); % all choices
        test_choice(i,3) = nanmean(filt_test_del.response_correct); % delay choices
        test_choice(i,4) = nanmean(filt_test_imm.response_correct); % imm choices
        
        test_choice(i,6) = nanmean(filt_test.confidence); % all confidence
        test_choice(i,7) = nanmean(filt_test_del.confidence); % del confidence
        test_choice(i,8) = nanmean(filt_test_imm.confidence); % imm confidence
        
        % rating
        test_rate(i,1) = i;
        [r,~] = corr(filt_test_rate.response,filt_test_rate.value_true);
        test_rate(i,2) = r;
        
        test_rate(i,3) = nanmean(filt_test_rate.response(filt_test_rate.value_true>0.5));
        test_rate(i,4) = nanmean(filt_test_rate.response(filt_test_rate.value_true<0.5));
        test_rate(i,5) = test_rate(i,3)-test_rate(i,4);
        
        test_rate(i,6) = nanmean(filt_test_rate_del.response(filt_test_rate_del.value_true>0.5));
        test_rate(i,7) = nanmean(filt_test_rate_del.response(filt_test_rate_del.value_true<0.5));
        test_rate(i,8) = nanmean(filt_test_rate_imm.response(filt_test_rate_imm.value_true>0.5));
        test_rate(i,9) = nanmean(filt_test_rate_imm.response(filt_test_rate_imm.value_true<0.5));
        
        
        % delay time
        %test_time(i,1) = i;
        %[r,~] = corr(filt_test_time.response,filt_test_time.delay);
        %test_time(i,2) = r;
        %test_time(i,3) = nanmean(filt_test_time.response(filt_test_time.delay==1));
        %test_time(i,4) = nanmean(filt_test_time.response(filt_test_time.delay==0));
        
        
%         
%         temptest = filt_test_same_long.response(1:12);
%         if iscell(temptest)
%             for k = 1:size(temptest,1)
%                 if strcmp(temptest{k},'3')
%                     temptestn(k,1) = 3;
%                 elseif strcmp(temptest{k},'2')
%                     temptestn(k,1) = 2;
%                 elseif strcmp(temptest{k},'1')
%                     temptestn(k,1) = 1;
%                 elseif strcmp(temptest{k},'0')
%                     temptestn(k,1) = 0;
%                 end
%             end
%             temptest = temptestn;
%             clear temptestn
%         end
%         test_perf(i,11) = nanmean(abs(temptest-1.5))-.5;
%         clear temptest
%         
%         temptest = filt_test_same_short.response(1:12);
%         if iscell(temptest)
%             for k = 1:size(temptest,1)
%                 if strcmp(temptest{k},'3')
%                     temptestn(k,1) = 3;
%                 elseif strcmp(temptest{k},'2')
%                     temptestn(k,1) = 2;
%                 elseif strcmp(temptest{k},'1')
%                     temptestn(k,1) = 1;
%                 elseif strcmp(temptest{k},'0')
%                     temptestn(k,1) = 0;
%                 end
%             end
%             temptest = temptestn;
%             clear temptestn
%         end
%         test_perf(i,12) = nanmean(abs(temptest-1.5))-.5;
%         clear temptest
%         
%         test_perf(i,13) = nanmean(filt_test_mix_hihi.response_correct);
%         test_perf(i,14) = nanmean(filt_test_mix_lolo.response_correct);
        
    elseif excludelearn
        test_day2_choice(i,12) = 1;
        test_rate(i,12) = 1;
    end
    
    
    
    %%%%%%%%%%%%%%%%%%%
    %%%% test day2 %%%%
    %%%%%%%%%%%%%%%%%%%
    if hastestday2 %&& (excludelearn==0)
        
        test_day2_choice(i,12) = 0;
        test_day2_rate(i,12) = 0;
        
        % filter
        filt_test_day2 = testday2Table(testday2Table.block_curr == 1, :);
        filt_test_day2_del = filt_test_day2(filt_test_day2.delay == 1, :);
        filt_test_day2_imm = filt_test_day2(filt_test_day2.delay == 0, :);
        
        filt_test_day2_rate = testday2Table(testday2Table.block_curr == 2, :);
        filt_test_day2_rate_del = filt_test_day2_rate(filt_test_day2_rate.delay == 1, :);
        filt_test_day2_rate_imm = filt_test_day2_rate(filt_test_day2_rate.delay == 0, :);
        
        % choice
        test_day2_choice(i,2) = nanmean(filt_test_day2.response_acc); % all choices
        test_day2_choice(i,3) = nanmean(filt_test_day2_del.response_acc); % delay choices
        test_day2_choice(i,4) = nanmean(filt_test_day2_imm.response_acc); % imm choices
        
        test_day2_choice(i,6) = nanmean(filt_test_day2.confidence); % all confidence
        test_day2_choice(i,7) = nanmean(filt_test_day2_del.confidence); % del confidence
        test_day2_choice(i,8) = nanmean(filt_test_day2_imm.confidence); % imm confidence
        
        % rating
        test_day2_rate(i,1) = i;
        [r,~] = corr(filt_test_day2_rate.response,filt_test_day2_rate.value_true);
        test_day2_rate(i,2) = r;
        
        test_day2_rate(i,3) = nanmean(filt_test_day2_rate.response(filt_test_day2_rate.value_true>0.5));
        test_day2_rate(i,4) = nanmean(filt_test_day2_rate.response(filt_test_day2_rate.value_true<0.5));
        test_day2_rate(i,5) = test_day2_rate(i,3)-test_day2_rate(i,4);
        
        test_day2_rate(i,6) = nanmean(filt_test_day2_rate_del.response(filt_test_day2_rate_del.value_true>0.5));
        test_day2_rate(i,7) = nanmean(filt_test_day2_rate_del.response(filt_test_day2_rate_del.value_true<0.5));
        test_day2_rate(i,8) = nanmean(filt_test_day2_rate_imm.response(filt_test_day2_rate_imm.value_true>0.5));
        test_day2_rate(i,9) = nanmean(filt_test_day2_rate_imm.response(filt_test_day2_rate_imm.value_true<0.5));
        
        if excludelearn
            test_day2_choice(i,12) = 1;
            test_day2_choice(i,9:11) = test_day2_choice(i,2:4);
            test_day2_choice(i,2:8) = NaN;
            test_day2_rate(i,12) = 1;
            test_day2_rate(i,10:11) = test_day2_rate(i,3:4);
            test_day2_rate(i,2:9) = NaN;
        end
        
    elseif excludelearn
        test_day2_choice(i,12) = 1;
        test_day2_rate(i,12) = 1;
    end
    
    
    
    %%%%%%%%%%%%%%%%%%
    %%%% fwdspan %%%%
    %%%%%%%%%%%%%%%%%%
    if hasfwd %&& (excludelearn==0)
        
        fwd_perf(i,6) = 0;
        
        
        % filter
        filt_fwd = fwdTable(fwdTable.exp_name == "fwdspan", :);
        
        % 
        fwd_perf(i,1) = i;
        fwd_perf(i,2) = max(filt_fwd.span.*filt_fwd.correct_full);
        
        if excludelearn
            fwd_perf(i,5) = fwd_perf(i,2);
            fwd_perf(i,2) = NaN;
        end

    elseif excludelearn
        fwd_perf(i,6) = 1;
    end
    

    
    %%%%%%%%%%%%%%%%
    %%%%% post %%%%%
    %%%%%%%%%%%%%%%%
    if haspost %&& (excludelearn==0)
        
        filt_post = postTable((postTable.exp_stage == "survey"), :);
        
        
        
        
        post_perf(i,1) = i;
        post_perf(i,2) = str2double(postTable.response{1});
        
        
        a5 = filt_post.response{5};
        a5 = a5(8:22);
        if strcmp(a5,'Definitely noti')
            post_perf(i,6) = 4;
        elseif strcmp(a5,'Sometimes notic')
            post_perf(i,6) = 3;
        elseif strcmp(a5,'Did not notice ')
            post_perf(i,6) = 2;
        elseif strcmp(a5,'Definitely no p')
            post_perf(i,6) = 1;
        end
        
        
        a6 = filt_post.response{6};
        if length(a6)>22
            a6 = a6(8:end-5);
        else
            a6 = a6(8:19);
        end
        %post_response{i,2} = a6;
        
        if strcmp(a6,'Learned much better with with longer de') || strcmp(a6,'Learned much better with longer de')
            post_perf(i,7) = 4;
        elseif strcmp(a6,'Longer delay')
            post_perf(i,7) = 3;
        elseif strcmp(a6,'Shorter dela')
            post_perf(i,7) = 2;
        elseif strcmp(a6,'Learned much better with with shorter de') || strcmp(a6,'Learned much better with shorter de')
            post_perf(i,7) = 1;
        end
        
        
        post_perf(i,8) = str2num(postTable.response{7});
        post_perf(i,9) = str2num(postTable.response{8});
        
        
        post_perf(i,10) = str2num(filt_post.response{10});
        
        post_response{i,1} = i;
        a9 = filt_post.response{9};
        a9 = a9(9:end-2);
        a12 = filt_post.response{12};
        a12 = a12(9:end-2);
        a13 = filt_post.response{13};
        a13 = a13(9:end-2);
        post_response{i,2} = a9;
        post_response{i,3} = a12;
        post_response{i,4} = a13;
        
    else
        post_response{i,1} = NaN;
    end
    
    
    
    
    %%%%%%%%%%%%%%%%%%%%%
    %%%%% post day2 %%%%%
    %%%%%%%%%%%%%%%%%%%%%
    if 1==2  %%hastestday2 %%(excludelearn==0)
        
        % questions 1-11
        %'memory'
        %'engagement1'
        %'engagement2'
        %'engagement3'
        %'environment1'
        %'comment1'
        % mood_rating_after_questionnaires
        %'state_stress'
        %'sleep1'
        %'sleep2'
        %'sleep3'
        
        filt_day2_post = testday2Cell(find(strcmp(testday2Cell(:,2),'survey')==1),:);
        filt_day2_response = filt_day2_post(:,11);
        filt_day2_choiceindex = filt_day2_post(:,35);
        %filt_day2_post = testday2Table((testday2Table.exp_stage == "survey"), :);
        
        post_day2_perf(i,1) = i;
        
        if strcmp(subjid,'6400c176195e0363ae8f6e1f')
        elseif size(filt_day2_post,1)>10
            post_day2_perf(i,3) = filt_day2_post{2,11}; % engagement rating
            post_day2_perf(i,8) = filt_day2_post{7,11}; % mood rating after questionnaires
            post_day2_perf(i,9) = filt_day2_post{8,11}; % stress rating
        end
        
        % memory
        % options: ['Very easy to remember', 'Easy', 'Average', 'Difficult', 'Very difficult to remember']
        a1 = filt_day2_choiceindex{1};
        a1 = a1(2);
        a1 = str2double(a1(1));
        post_day2_perf(i,2) = a1+1;
%         a1 = filt_day2_response{1};
%         %a1 = a1(8:end-2);
%         if strcmp(a1(8:end-2),'Easy')
%             post_day2_perf(i,2) = 2;
%         elseif strcmp(a1(8:13),'Very e')
%             post_day2_perf(i,2) = 1;
%         elseif strcmp(a1(8:13),'Averag')
%             post_day2_perf(i,2) = 3;
%         elseif strcmp(a1(8:13),'Diffic')
%             post_day2_perf(i,2) = 4;
%         elseif strcmp(a1(8:13),'Very d')
%             post_day2_perf(i,2) = 5;
%         end
        
        
        
        % eliminate distractions
        % options: ['Yes', 'Somewhat', 'A little', 'No']
        a3 = filt_day2_choiceindex{3};
        a3 = a3(2);
        a3 = str2double(a3(1));
        post_day2_perf(i,4) = a3+1;
%         a3 = filt_day2_response{3};
%         a3 = a3(8);
%         if strcmp(a3,'Y')
%             post_day2_perf(i,3) = 4;
%         elseif strcmp(a3,'S')
%             post_day2_perf(i,3) = 3;
%         elseif strcmp(a3,'A')
%             post_day2_perf(i,3) = 2;
%         elseif strcmp(a3,'N')
%             post_day2_perf(i,3) = 1;
%         end
        
        
        if strcmp(subjid,'6400c176195e0363ae8f6e1f')
        elseif size(filt_day2_post,1)>10
        
        % environment similarity
        % 'Same room/location + Same computer',
        % 'Same room/location + Different computer',
        % 'Different room/location + Same computer',
        % 'Different room/location + Different computer'
        a5 = filt_day2_choiceindex{5};
        a5 = a5(2);
        a5 = str2double(a5(1));
        post_day2_perf(i,6) = a5+1;
        
        % sleep1
        % options: ['Very good', 'Good', 'Average', 'Poor', 'Very poor']
        a9 = filt_day2_choiceindex{9};
        a9 = a9(2);
        a9 = str2double(a9(1));
        post_day2_perf(i,10) = (abs(a9-4))+1;
        
        % sleep2
        % options: ['Much more sleep', 'More sleep', 'Average', 'Less', 'Much less sleep']
        a10 = filt_day2_choiceindex{10};
        a10 = a10(2);
        a10 = str2double(a10(1));
        post_day2_perf(i,11) = (abs(a10-4))+1;
        
        % sleep3
        % options: ['Very good', 'Good', 'Average', 'Poor', 'Very poor']
        a11 = filt_day2_choiceindex{11};
        a11 = a11(2);
        a11 = str2double(a11(1));
        post_day2_perf(i,12) = (abs(a11-4))+1;
        
        
        post_day2_response{i,1} = i;
        a1 = filt_day2_response{1};
        a1 = a1(8:end-2);
        a3 = filt_day2_response{3};
        a3 = a3(8:end-2);
        a4 = filt_day2_response{4};
        a4 = a4(9:end-2);
        a5 = filt_day2_response{5};
        a5 = a5(8:end-2);
        a6 = filt_day2_response{6};
        a6 = a6(9:end-2);
        a9 = filt_day2_response{9};
        a9 = a9(8:end-2);
        a10 = filt_day2_response{10};
        a10 = a10(8:end-2);
        a11 = filt_day2_response{11};
        a11 = a11(8:end-2);
        
        post_day2_response{i,2} = a1;
        post_day2_response{i,3} = filt_day2_response{2};
        post_day2_response{i,4} = a3;
        post_day2_response{i,5} = a4;
        post_day2_response{i,6} = a5;
        post_day2_response{i,7} = a6;
        post_day2_response{i,8} = filt_day2_response{7};
        post_day2_response{i,9} = filt_day2_response{8};
        post_day2_response{i,10} = a9;
        post_day2_response{i,11} = a10;
        post_day2_response{i,12} = a11;

        end
    else
        post_day2_response{i,1} = NaN;
    end
    
    
    
    
    
    %%%%%%%%%%%%%%%%
    %%%% survey %%%%
    %%%%%%%%%%%%%%%%
    if hassurvey %&& (excludelearn==0)
        
        % filter
        filt_phq = surveyTable(surveyTable.exp_stage == "PHQ9", :);
        filt_phq = filt_phq(2,:);
        filt_gad = surveyTable(surveyTable.exp_stage == "GAD7", :);
        filt_gad = filt_gad(2,:);
        filt_stai = surveyTable(surveyTable.exp_stage == "STAI", :);
        filt_stai = filt_stai(2,:);
        filt_sds = surveyTable(surveyTable.exp_stage == "SDS", :);
        filt_sds = filt_sds(2,:);
        filt_masq = surveyTable(surveyTable.exp_stage == "MASQ_7", :);
        filt_masq = filt_masq(2,:);
        filt_aes = surveyTable(surveyTable.exp_stage == "AES", :);
        filt_aes = filt_aes(2,:);
        filt_sticsa = surveyTable(surveyTable.exp_stage == "STICSA", :);
        filt_sticsa = filt_sticsa(2,:);
        filt_pvss = surveyTable(surveyTable.exp_stage == "PVSS", :);
        filt_pvss = filt_pvss(2,:);
        
        
        % PHQ
        % 9 items
        % catch
        resp_phq = cell2mat(filt_phq.response_string);
        subj_phq = survey_extract(resp_phq,'PHQ',9); % plus catch
        % using survey_extract function
        %subj_phq = [];
        %qindex = 1;
        %for iq = 1:size(resp_phq,2)-1
        %    if strcmp(':',resp_phq(iq))
        %        score_temp = resp_phq(iq+1);
        %        score_temp = str2double(score_temp);
        %        subj_phq(qindex,1) = score_temp;
        %        qindex = qindex+1;
        %        clear score_temp
        %    end
        %end
        survey_phq(i,1) = sum(subj_phq);
        
        % GAD
        % 7 items
        resp_gad = cell2mat(filt_gad.response_string);
        subj_gad = survey_extract(resp_gad,'GAD',7);
        survey_gad(i,1) = sum(subj_gad);
        
        
        % STAI
        % 18 items
        %// reverse-coded items:  1, 3, 6, 7, 10, 13, 14, 16, 19
        % catch
        % also has: BDI5, LOTR1, RRQ3
        % ADD to score: GAD item_1 + item_5 (average these scores), PHQ item_6
        %resp_stai = cell2mat(filt_stai.response_string);
        %subj_stai = survey_extract(resp_stai,'STAI',18); % plus catch
        %survey_stai(i,1) = sum(subj_stai);
        
        
        % SDS
        % 16 items
        %// reverse-coded items:  2, 5, 6, 11, 12, 14, 16, 17, 18, 20
        % catch
        % ADD to score: PHQ item_2, PHQ item_3, GAD item_5, GAD item_6, PHQ item_9
        %resp_sds = cell2mat(filt_sds.response_string);
        %subj_sds = survey_extract(resp_sds,'SDS',16); % plus catch
        %survey_sds(i,1) = sum(subj_sds);
        
        
        % MASQ
        % 8 items
        %// reverse-coded items:  1, 9, 15, 19, 23, 25
        % also has: hads2, hads6
        %resp_masq = cell2mat(filt_masq.response_string);
        %subj_masq = survey_extract(resp_masq,'masq',8);
        %survey_masq(i,1) = sum(subj_masq);
        
        
        % AES
        % 18 items
        %// reverse-coded items:  all except 6, 10, 11 (1, 2, 3, 4, 5, 7, 8, 9, 12, 13, 14, 15, 16, 17, 18)
        % catch
        % also has: FSS_9
        %resp_aes = cell2mat(filt_aes.response_string);
        %subj_aes = survey_extract(resp_aes,'AES',18); % plus catch
        %survey_aes(i,1) = sum(subj_aes);
        
        
        % STICSA
        % 10 items
        % catch
        % ADD to score: SDS item_9
        resp_sticsa = cell2mat(filt_sticsa.response_string);
        subj_sticsa = survey_extract(resp_sticsa,'STICSA',10); % plus catch
        survey_sticsa(i,1) = sum(subj_sticsa);
        
        
        % PVSS
        % 21 items
        % catch
        resp_pvss = cell2mat(filt_pvss.response_string);
        subj_pvss = survey_extract(resp_pvss,'PVSS',21); % plus catch
        survey_pvss(i,1) = sum(subj_pvss);
        
        
        
        
        
        % 
        
        % catch items
        % phq answer 0
        % stai answer 0
        % aes answer 0
        % sds answer 0
        % sticsa answer 3
        % pvss answer 8
        
        
        
        if excludelearn
            survey_phq(i,2) = survey_phq(i,1);
            survey_gad(i,2) = survey_gad(i,1);
        end
        
    elseif excludelearn
        
    end
    
    
end


% no longer removing zeros
% survey_phqx = survey_phq;
% survey_phqx(survey_phqx==0) = NaN;
% survey_gadx = survey_gad;
% survey_gadx(survey_gadx==0) = NaN;
% survey_comb = survey_phq(:,1)+survey_gad(:,1);
% survey_combx = survey_comb;
% survey_combx(survey_combx==0) = NaN;




learn_extract = learn_perf(:,[4,7,8]); % last 4 reps all, long, short


nexclude = sum(learn_perf(:,14)==1)
ninclude = sum(learn_perf(:,14)==0);
excluderate = nexclude/(nexclude+ninclude)

nsurvey = nansum(survey_phq(:,1)>-1)

% delay frustration and learning for long delay, r = -0.156, p = 0.193
% no correlation with test phase though
% [r, p ] = corr(learn_extract(:,3),post_perf(:,3),'rows','complete')


figure,plot(nanmean(learn_repdel_perf))
hold on
plot(nanmean(learn_repimm_perf))


% learn_mood(:,2) = mean of post-feedback ratings
% learn_mood(:,3) = mean of post-learning-rest baseline ratings
figure,scatter(survey_phq(:,1),learn_mood(:,3))
[r_phq_mood,~] = corr(survey_phq(:,1),learn_mood(:,3),'rows','complete')

% no evidence that baseline mood correlates with strength of feedback-mood
% correlation or mood rew-mood miss


% in-task and after rest means correlated
% [r,p] = corr(learn_mood(:,2),learn_mood(:,3),'rows','complete')
% r = 0.97

% reward and miss - mood correlation for delay separate from imm fdbk
% delay learn_mood(:,9) imm learn_mood(:,10)

% learn mood (:,12) = post-reward minus baseline
% learn mood (:,13) = post-miss minus baseline
% [r,p] = corr(survey_phq(:,1),learn_mood(:,12),'rows','complete')

% scatter(test_rate(:,5),test_day2_rate(:,5))


if 1==2
    
    histogram(survey_phq(:,1))
    ylim([0,20])
    xlim([-1.5,23.5])
    
    [r,p] = corr(survey_phq(:,1),learn_repdel_perf(:,7),'rows','complete')
    
    [r,p] = corr(survey_gad(:,1),learn_rep(:,7),'rows','complete')
end

% study1
% mean n = 11 with 'very frustrated' 
%  0.6724    0.6193    0.7258  (10.65% diff)
% mean n = 58 other
%  0.7857    0.7673    0.8040  (3.67% diff)

% study1
% some weak correlation between mood rating frustration and poor performance
if 1==2
    
    [h p ci stats] = ttest(sum(learn_repdel_perf(:,10:18),2),sum(learn_repimm_perf(:,10:18),2))

    [r_rate_rateday2,p] = corr(test_rate(:,5),test_day2_rate(:,5),'rows','complete');
    r_rate_rateday2
    
    [r, p ] = corr(learn_extract(:,1),post_perf(:,4),'rows','complete')
    % r = -0.242, p = 0.042
    % 
    learnexl = (learn_all_perf(learn_perf(:,14)==1,:));
    learnx = nanmean(learnexl(:,16:18)')';
    learnx(:,2) = nanmean(learnexl(:,15:18)')';
    learnx(:,3) = nanmean(learnexl(:,14:18)')';
    learnx(:,4) = nanmean(learnexl(:,13:18)')';
    plot(learn_all_perf')


    plot(learn_all_perf(learn_perf(:,14)==1,:)')
end


% study1
% correlation between self-rated engagement and performance
if 1==2
    [r, p ] = corr(learn_extract(:,1),post_perf(:,6),'rows','complete')
    % r=0.33, p=0.005
    [r, p ] = corr(test_extract(:,1),post_perf(:,6),'rows','complete')
end





%%%%%%%%%%%
if 1==2
    
    
    for i = 1:18
        [rs_depr(1,i),ps_depr(1,i)] = corr(survey_phq(:,1),learn_rep_perf(:,i),'rows','complete');
    end
    for i = 1:18
        [rs_del_depr(1,i),ps_del_depr(1,i)] = corr(survey_phq(:,1),learn_repdel_perf(:,i),'rows','complete');
    end
    for i = 1:18
        [rs_imm_depr(1,i),ps_imm_depr(1,i)] = corr(survey_phq(:,1),learn_repimm_perf(:,i),'rows','complete');
    end
    
    
    for i = 1:18
        [rs_del_anx(1,i),ps_del_anx(1,i)] = corr(survey_gad(:,1),learn_repdel_perf(:,i),'rows','complete');
    end
    for i = 1:18
        [rs_imm_anx(1,i),ps_imm_anx(1,i)] = corr(survey_gad(:,1),learn_repimm_perf(:,i),'rows','complete');
    end
    
    for i = 1:18
        [rs_anxdepr(1,i),ps_anxdepr(1,i)] = corr(survey_phq(:,1)+survey_gad(:,1),learn_rep_perf(:,i),'rows','complete');
    end
    
    for i = 1:18
        [rs_del_anxdepr(1,i),ps_del_anxdepr(1,i)] = corr(survey_phq(:,1)+survey_gad(:,1),learn_repdel_perf(:,i),'rows','complete');
    end
    for i = 1:18
        [rs_imm_anxdepr(1,i),ps_imm_anxdepr(1,i)] = corr(survey_phq(:,1)+survey_gad(:,1),learn_repimm_perf(:,i),'rows','complete');
    end
    figure,plot(rs_depr)
    hold on
    plot(rs_del_depr)
    plot(rs_imm_depr)
    
    figure,plot(rs_anxdepr)
    hold on
    plot(rs_del_anxdepr)
    plot(rs_imm_anxdepr)
    
    [rs_delh2_depr,ps_delh2_depr] = corr(survey_phq(:,1),sum(learn_repdel_perf(:,10:18),2),'rows','complete')
    
    [rs_immh2_depr,ps_immh2_depr] = corr(survey_phq(:,1),sum(learn_repimm_perf(:,10:18),2),'rows','complete')
    
    survey_comb = survey(:,1)+survey(:,2)+survey(:,9)+survey(:,10)+survey(:,11);
    
    for i = 1:16
        [rs_anx(1,i),ps_anx(1,i)] = corr(survey(:,2),task_slide(:,i));
    end
    for i = 1:16
        [rs_depr(1,i),ps_depr(1,i)] = corr(survey(:,1),task_slide(:,i));
    end
    
    for i = 1:16
        [rs_comb(1,i),ps_comb(1,i)] = corr(survey(:,3),task_slide(:,i));
    end
    
    plot(nanmean(task_slide(survey(:,2)<median(survey(:,2)))))
    hold on; plot(nanmean(task_slide(survey(:,2)<median(survey(:,2)),:)))
    
    plot(nanmean(task_slide(survey(:,1)<median(survey(:,1)),:)))
    hold on; plot(nanmean(task_slide(survey(:,1)>median(survey(:,1)),:)))
    
    

    
    
    for i = 1:18
        [rs_sds(1,i),ps_sds(1,i)] = corr(survey(:,3),task_rep(:,i));
    end
    for i = 1:18
        [rs_stai(1,i),ps_stai(1,i)] = corr(survey(:,4),task_rep(:,i));
    end
    for i = 1:18
        [rs_aes(1,i),ps_aes(1,i)] = corr(survey(:,5),task_rep(:,i));
    end
    for i = 1:18
        [rs_masq(1,i),ps_masq(1,i)] = corr(survey(:,6),task_rep(:,i));
    end
    for i = 1:18
        [rs_sticsa(1,i),ps_sticsa(1,i)] = corr(survey(:,7),task_rep(:,i));
    end
    
    [r,p] = corr(survey(:,3),task_rep(:,7))
    
    [r,p] = corr(sum(survey(:,[1,2,3,4,5,6,7])')',task_rep(:,7))
    
    
    % anx and depr per repetition
    %for i = 1:18
    %    [rs_all(1,i),ps_all(1,i)] = corr(sum(survey(:,[1,2,3,4,5,6,7])')',task_rep(:,i));
    %end
    
    
    % across task measure
    task_del = mean(task_repdel,2);
    task_imm = mean(task_repimm,2);
    [r, p] = corr(survey(:,1)+survey(:,2),task_del)
    [r, p] = corr(survey(:,1)+survey(:,2),task_imm)

    % post-questionnaire
    
    % concern about delay frustration driving mood/anx relationship
    % doesn't appear the case, but need to do regression
    % (and need vas for more graded responses)
    % 
    [r,p] = corr(task_repdel(:,7),post_delfrust)
    % 
    [r,p] = corr(survey(:,2),post_delfrust)
    scatter(survey(:,1),post_delfrust)
    % r's of ~0.18, p's ~0.17
    % highest for AES, p=0.06
    
    % anx/depr more frustrated by the mood ratings
    [r,p] = corr(survey(:,2),post_moodfrust)
    % r=0.267, p=0.031 for anx; similar for depr
    
    % no link between 'notice delay' and anx/depr
    % no link between 'delay better performance' and anx/depr
    
    % negative between engagement vas and anx/depr, r's -0.18 to -0.20
    [r,p] = corr(survey(:,1),post_engagement)
    
    % negative correlation with del perf and engagement in particular
    [r,p] = corr(task_repdel(:,7),post_engagement)
    [r,p] = corr(task_repimm(:,7),post_engagement)
    

    % regression controlling for delay frustration
    [b,dev,stats] = glmfit([survey(:,2) post_delfrust],task_rep(:,7));
    stats.p
    
    
    
end



function subj_out = survey_extract(resp_in,sname,nitems)
    qindex = 1;
    subj_out = [];
    for iq = 1:size(resp_in,2)-1
        if strcmp(':',resp_in(iq))
            % 'Catch":0'
            if ~strcmp('ch',resp_in(iq-3:iq-2)) && (qindex<=nitems)
                score_temp = resp_in(iq+1);
                score_temp = str2double(score_temp);
                subj_out(qindex,1) = score_temp;
                qindex = qindex+1;
            end
        end
    end
end
